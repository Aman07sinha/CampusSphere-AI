const { z } = require("zod");


const createSubjectSchema = z.object({

    subjectCode: z

        .string()

        .min(

            1,

            "Subject Code is required"

        ),

    subjectName: z

        .string()

        .min(

            1,

            "Subject Name is required"

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

    credits: z

        .number()

        .min(1)

        .max(10)

        .optional(),

});


module.exports = {

    createSubjectSchema,

};
