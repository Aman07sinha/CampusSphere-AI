const jwt = require("jsonwebtoken");

const User = require(
    "../module/user/user.model"

);


const protect = async (
    req,
    res,
    next
) => {
    try {
        let token;

        // Read Token
        const authHeader =
            req.headers.authorization;
        if (
            authHeader &&
            authHeader.startsWith(
                "Bearer "
            )
        ) {
            token = authHeader.split(
                " "
            )[1];
        }


        if (!token) {
            return res.status(401)
            .json({
                success: false,
                message:
                "Not authorized"
            });
        }


        // Verify JWT

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET

        );


        // Find User

        const user = await User.findById(
            decoded.id
        ).select("-password");

        if (!user) {
            return res.status(401)
            .json({
                success:false,
                message:
                "User not found"
            });
        }
        req.user = user;
        next();
    }

    catch (error) {
        res.status(401).json({
            success:false,
            message:
            "Invalid Token"
        });
    }
};

module.exports = {
    protect,
};
