const Subject = require(

    "./subject.model"

);


// Create Subject
const createSubject = async (

    subjectData

) => {

    const existingSubject =

        await Subject.findOne({

            subjectCode:

            subjectData.subjectCode,

        });


    if (existingSubject) {

        throw new Error(

            "Subject already exists"

        );

    }


    const subject =

        await Subject.create(

            subjectData

        );


    return {

        success: true,

        message:

        "Subject created successfully",

        subject,

    };

};


// Get All Subjects
const getAllSubjects = async () => {

    const subjects =

        await Subject.find();

    return {

        success: true,

        subjects,

    };

};


// Get Semester Wise Subjects
const getSubjectsBySemester = async (

    semester

) => {

    const subjects =

        await Subject.find({

            semester,

            isActive:true,

        });


    return {

        success: true,

        subjects,

    };

};


module.exports = {

    createSubject,

    getAllSubjects,

    getSubjectsBySemester,

};
