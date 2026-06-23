const { z } = require("zod");


const createStudentSchema = z.object({

    enrollmentNumber: z

        .string()

        .min(

            1,

            "Enrollment Number is required"

        ),

    branch: z

        .string()

        .min(

            1,

            "Branch is required"

        ),

    semester: z

        .number()

        .min(1)

        .max(8),

    section: z

        .string()

        .optional(),

    batch: z

        .string()

        .min(

            1,

            "Batch is required"

        ),

    cgpa: z

        .number()

        .min(0)

        .max(10)

        .optional(),

    skills: z

        .array(

            z.string()

        )

        .optional(),

    github: z

        .string()

        .optional(),

    linkedin: z

        .string()

        .optional(),

    portfolioUrl: z

        .string()

        .optional(),

    resume: z

        .string()

        .optional(),

    bio: z

        .string()

        .optional(),

});


module.exports = {

    createStudentSchema,

};
