const Admin = require(

    "./admin.model"

);

const User = require(

    "../user/user.model"

);


const createSuperAdmin = async (

    userId,

    adminData

) => {

    // Check User

    const user =

        await User.findById(

            userId

        );


    if (!user) {

        throw new Error(

            "User not found"

        );

    }


    // Check Role

    if (

        user.role !== "admin"

    ) {

        throw new Error(

            "User is not admin"

        );

    }


    // Check Existing Admin

    const existingAdmin =

        await Admin.findOne({

            userId,

        });


    if (existingAdmin) {

        throw new Error(

            "Admin profile already exists"

        );

    }


    // Create Admin

    const admin =

        await Admin.create({

            userId,

            ...adminData,


            permissions: {

                manageStudents:true,

                manageTeachers:true,

                manageSubjects:true,

                manageAttendance:true,

                manageMarks:true,

                manageAssignments:true,

                managePlacements:true,

                manageMarketplace:true,

                manageEvents:true,

            }

        });


    // Update User

    user.profileId =

        admin._id;


    await user.save();


    return {

        success:true,

        message:

        "Super Admin created successfully",

        admin,

    };

};


module.exports = {

    createSuperAdmin,

};
