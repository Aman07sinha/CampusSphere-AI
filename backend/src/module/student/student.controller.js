const {createStudentProfile, getStudentProfile,updateStudentProfile} = require("./student.service");


const {createStudentSchema} = require("./student.validation");


// Create Student Profile

const createProfile = async ( req, res) => {

    try {

        const validatedData =
            createStudentSchema.parse(req.body);


        const response =
            await createStudentProfile(req.user._id, validatedData);
                res.status(201).json(response);
    }

    catch (error) {

        res.status(400).json({

            success:false,

            message:error.message,

        });

    }

};


// Get Student Profile

const getProfile = async (

    req,

    res

) => {

    try {

        const response =

            await getStudentProfile(

                req.user._id

            );


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


// Update Student Profile

const updateProfile = async (

    req,

    res

) => {

    try {

        const response =

            await updateStudentProfile(

                req.user._id,

                req.body

            );


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


module.exports = {

    createProfile,

    getProfile,

    updateProfile,

};
