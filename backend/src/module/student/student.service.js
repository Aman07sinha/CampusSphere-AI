const Student = require( "./student.model");

const User = require( "../user/user.model");


const createStudentProfile = async (

    userId,

    studentData

) => {

    // Check User Exists
    const user = await User.findById(

        userId

    );

    if (!user) {

        throw new Error(

            "User not found"

        );

    }

    // Check Student Profile Exists
    const existingStudent =

        await Student.findOne({

            userId,

        });


    if (existingStudent) {

        throw new Error(

            "Student profile already exists"

        );

    }


    // Create Student

    const student =

        await Student.create({

            userId,

            ...studentData,

        });


    // Update User.profileId

    user.profileId =

        student._id;


    await user.save();


    return {

        success: true,

        message:

        "Student profile created successfully",

        student,

    };

};


const getStudentProfile = async (

    userId

) => {

    const student =

        await Student.findOne({

            userId,

        })

        .populate(

            "userId",

            "-password"

        );


    if (!student) {

        throw new Error(

            "Student profile not found"

        );

    }


    return {

        success: true,

        student,

    };

};


const updateStudentProfile = async (

    userId,

    updateData

) => {

    const student =

        await Student.findOneAndUpdate(

            {

                userId,

            },

            updateData,

            {

                new: true,

            }

        );


    if (!student) {

        throw new Error(

            "Student profile not found"

        );

    }


    return {

        success: true,

        message:

        "Student profile updated successfully",

        student,

    };

};


module.exports = {

    createStudentProfile,

    getStudentProfile,

    updateStudentProfile,

};



