const { registerUser, verifyOTP, loginUser } = require("./auth.service");
const {
    registerSchema,
    verifyOTPSchema,
    loginSchema
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

module.exports = {
    register,
    verifyEmail,
    login
};
