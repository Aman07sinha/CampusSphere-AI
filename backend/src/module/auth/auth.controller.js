const { registerUser, verifyOTP, loginUser, forgotPassword, resetPassword, logoutUser } = require("./auth.service");
const {
    registerSchema,
    verifyOTPSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} = require("./auth.validation");


const register = async (req, res) => {
    try {
        // Validate Request Body
        const validatedData =
            registerSchema.parse(req.body);

        // Call Service
        const response = await registerUser(
            validatedData
        );
        // Send Response
        res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const verifyEmail = async (req, res) => { 
    try { 
        const { 
            email, 
            otp, 
        } = verifyOTPSchema.parse( 
            req.body 
        ); 
        const response = await verifyOTP( 
            email, 
            otp 
        ); 
        res.status(200).json( 
            response 
        ); 
    } 
    catch (error) {  
        res.status(400).json({
            success: false, 
            message: error.message, 
            }); 
        } 
    };

const login = async (req, res) => {
    try {
        const { userId, password } = loginSchema.parse(req.body);
        const response = await loginUser(userId, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Forgot Password
const forgotPasswordController = async (

    req,

    res

) => {

    try {

        const {

            email,

        } = forgotPasswordSchema.parse(

            req.body

        );


        const response =

            await forgotPassword(

                email

            );


        res.status(200).json(

            response

        );

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// Reset Password
const resetPasswordController = async (

    req,

    res

) => {

    try {

        const {

            email,

            otp,

            newPassword,

        } = resetPasswordSchema.parse(

            req.body

        );


        const response =

            await resetPassword(

                email,

                otp,

                newPassword

            );


        res.status(200).json(

            response

        );

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// Logout
const logout = async (

    req,

    res

) => {

    try {

        const response =

            await logoutUser();


        res.status(200).json(

            response

        );

    }

    catch (error) {

        res.status(400).json({

            success:false,

            message:error.message,

        });

    }

};


const getMe = async (req, res) => {
    res.status(200).json({
        success:true,
        user:req.user,
    });
};


module.exports = {
    register,
    verifyEmail,
    login,
    getMe,
    forgotPasswordController,
    resetPasswordController,
    logout,
};
