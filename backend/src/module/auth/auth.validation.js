const { z } = require("zod");

// Register
const registerSchema = z.object({

    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .string()
        .email("Invalid email format"),

    mobile: z
        .string()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid mobile number"
        ),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must not exceed 20 characters"),

});


// Login
const loginSchema = z.object({

    userId: z
        .string()
        .min(1, "User ID is required"),

    password: z
        .string()
        .min(1, "Password is required"),

});


// Verify OTP
const verifyOTPSchema = z.object({

    email: z
        .string()
        .email("Invalid email format"),

    otp: z
        .string()
        .length(6, "OTP must be 6 digits"),

});


// Resend OTP
const resendOTPSchema = z.object({

    email: z
        .string()
        .email("Invalid email format"),
});


// Forgot Password
const forgotPasswordSchema = z.object({

    email: z
        .string()
        .email("Invalid email format"),
});

// Reset Password
const resetPasswordSchema = z.object({

    email: z
        .string()
        .email("Invalid email format"),

    otp: z
        .string()
        .length(6, "OTP must be 6 digits"),

    newPassword: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        )
});

module.exports = {

    registerSchema,
    loginSchema,
    verifyOTPSchema,
    resendOTPSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};