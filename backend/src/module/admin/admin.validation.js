const { z } = require("zod");

const createSuperAdminSchema = z.object({

    employeeId: z

        .string()

        .min(

            1,

            "Employee ID is required"

        ),

    designation: z

        .string()

        .min(

            1,

            "Designation is required"

        ),

    department: z

        .string()

        .min(

            1,

            "Department is required"

        ),

});


module.exports = {

    createSuperAdminSchema,

};
