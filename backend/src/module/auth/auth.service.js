const bcrypt = require("bcryptjs");
const User = require("../user/user.model");
const Counter = require("../counter/counter.model");
const OTPVerification = require("./otpVerification.model");
const generateOTP = require("../../utils/generateOTP");
const sendEmail = require("../../utils/sendEmail");
const jwt = require("jsonwebtoken");


const generateStudentId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "student" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true,}
    );

    const sequence = counter.sequenceValue
        .toString()
        .padStart(4, "0");
    const year = new Date().getFullYear();
    return `STU${year}${sequence}`;
};

const generateTeacherId = async () => {
    const counter = await Counter.findOneAndUpdate(

        { name: "teacher" },
        { $inc: { sequenceValue: 1 } },
        {
            new: true,
            upsert: true,
        }
    );

    const sequence = counter.sequenceValue
        .toString()
        .padStart(4, "0");
    const year = new Date().getFullYear();
    return `TCH${year}${sequence}`;
};

const generateAdminId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "admin" },
        { $inc: { sequenceValue: 1 } },
        {
            new: true,
            upsert: true,
        }
    );

    const sequence = counter.sequenceValue
        .toString()
        .padStart(4, "0");
    const year = new Date().getFullYear();
    return `ADM${year}${sequence}`;
};

const registerUser = async (userData) => { 
    const { 
        firstName, 
        lastName, 
        email,
        mobile, 
        password, 
    } = userData; 

    // Check Email Exists
    const existingUser = await User.findOne({email}); 
    if (existingUser) { 
        throw new Error("Email already registered"); 
    } 
    // Check Mobile Exists
    const existingMobile = await User.findOne({mobile}); 
    if (existingMobile) { 
        throw new Error("Mobile number already registered"); 
    } // Hash Password 
    const hashedPassword = await bcrypt.hash( 
        password, 
        10 
    ); 
    // Create User 
    const user = await User.create({ 
        firstName, 
        lastName, 
        email, 
        mobile, 
        password: hashedPassword, 
        role: "student", 
        // userId: null, 
        isVerified: false, 
    }); 
    // Generate OTP 
    const otp =  generateOTP(); 
    // Hash OTP 
    const hashedOTP = await bcrypt.hash( 
        otp, 
        10 
    ); 
    // Remove Previous OTP 
    await OTPVerification.deleteMany({email}); 

    // Save OTP 
    await OTPVerification.create({ 
        userId: user._id, 
        email, 
        otp: hashedOTP, 
        expiresAt: new Date( 
            Date.now() + 5 * 60 * 1000 
        ), 
    }); 
    // Send Email 
    await sendEmail(
        email, 
        "AI College ERP - Email Verification", 
        `Your OTP is ${otp}. Valid for 5 minutes.` 
    ); 
    return { 
        success: true, 
        message: "OTP sent successfully", 
    }; 
};

const verifyOTP = async (email, enteredOTP) => {

    // Find OTP Record
    const otpRecord = await OTPVerification.findOne({
        email,
    });
    if (!otpRecord) {
        throw new Error(
            "OTP not found or expired"
        );
    }

    // Check Expiry
    if (
        otpRecord.expiresAt < new Date()
    ) {
        throw new Error(
            "OTP has expired"
        );
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(
        enteredOTP,
        otpRecord.otp
    );

    if (!isMatch) {
        throw new Error(
            "Invalid OTP"
        );
    }

    // Find User
    const user = await User.findById(
        otpRecord.userId
    );

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    // Verify User
    user.isVerified = true;

    // Generate Student ID
    user.userId =
        await generateStudentId();
    await user.save();

    // Delete OTP
    await OTPVerification.deleteOne({
        _id: otpRecord._id,
    });

    return {
        success: true,
        message:
        "Email verified successfully",
        userId: user.userId,
    };
};

const loginUser = async (

    userId,

    password

) => {

    // Find User

    const user = await User.findOne({

        userId,

    });


    if (!user) {

        throw new Error(

            "Invalid User ID"

        );

    }


    // Check Email Verification

    if (!user.isVerified) {

        throw new Error(

            "Please verify your email first"

        );

    }


    // Check Active Status

    if (!user.isActive) {

        throw new Error(

            "Your account is disabled"

        );

    }


    // Compare Password
    const isMatch = await bcrypt.compare(

        password,

        user.password

    );


    if (!isMatch) {

        throw new Error(

            "Invalid Password"

        );

    }


    // Update Last Login

    user.lastLogin = new Date();

    await user.save();


    // Generate JWT

    const token = jwt.sign(

        {

            id: user._id,

            role: user.role,

            userId: user.userId,

        },

        process.env.JWT_SECRET,

        {

            expiresIn:

            process.env.JWT_EXPIRE,

        }

    );


    return {

        success: true,

        message:

        "Login successful",

        token,

        user: {

            id: user._id,

            userId: user.userId,

            firstName:

            user.firstName,

            lastName:

            user.lastName,

            role: user.role,

            email: user.email,

        }

    };
};

const forgotPassword = async (

    email

) => {

    const user = await User.findOne({

        email,

    });


    if (!user) {

        throw new Error(

            "User not found"

        );

    }


    // Generate OTP

    const otp = generateOTP();


    // Hash OTP

    const hashedOTP = await bcrypt.hash(

        otp,

        10

    );


    // Delete Old OTP

    await OTPVerification.deleteMany({

        email,

    });


    // Save OTP

    await OTPVerification.create({

        userId: user._id,

        email,

        otp: hashedOTP,

        expiresAt: new Date(

            Date.now() + 5 * 60 * 1000

        ),

    });


    // Send Email

    await sendEmail(

        email,

        "AI College ERP - Password Reset",

        `Your OTP is ${otp}. Valid for 5 minutes.`

    );


    return {

        success: true,

        message:

        "Password reset OTP sent successfully",

    };
};

const resetPassword = async (

    email,

    otp,

    newPassword

) => {

    const otpRecord =

        await OTPVerification.findOne({

            email,

        });


    if (!otpRecord) {

        throw new Error(

            "OTP not found"

        );

    }


    if (

        otpRecord.expiresAt < new Date()

    ) {

        throw new Error(

            "OTP expired"

        );

    }


    const isMatch = await bcrypt.compare(

        otp,

        otpRecord.otp

    );


    if (!isMatch) {

        throw new Error(

            "Invalid OTP"

        );

    }


    const user = await User.findOne({

        email,

    });


    const hashedPassword =

        await bcrypt.hash(

            newPassword,

            10

        );


    user.password =

        hashedPassword;


    await user.save();


    await OTPVerification.deleteMany({

        email,

    });


    return {

        success: true,

        message:

        "Password reset successful",

    };

};

const logoutUser = async () => {

    return {

        success: true,

        message:

        "Logout successful",

    };

};


module.exports = {

    generateStudentId,
    generateTeacherId,
    generateAdminId,
    registerUser,
    verifyOTP,
    loginUser,
    forgotPassword, 
    resetPassword,  
    logoutUser, 
};
