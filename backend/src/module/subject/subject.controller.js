const {

    createSubject,

    getAllSubjects,

    getSubjectsBySemester,

} = require(

    "./subject.service"

);


const {

    createSubjectSchema,

} = require(

    "./subject.validation"

);


// Create Subject

const create = async (

    req,

    res

) => {

    try {

        const validatedData =

            createSubjectSchema.parse(

                req.body

            );


        const response =

            await createSubject(

                validatedData

            );


        res.status(201).json(

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


// Get All Subjects

const getAll = async (

    req,

    res

) => {

    try {

        const response =

            await getAllSubjects();


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


// Get Subjects By Branch + Semester

const getBySemester = async (

    req,

    res

) => {

    try {

        const {

            branch,

            semester,

        } = req.query;


        const response =

            await getSubjectsBySemester(

                branch,

                semester

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

    create,

    getAll,

    getBySemester,

};
