const Counter = require("../counter/counter.model");

const generateStudentId = async () => {

    const counter = await Counter.findOneAndUpdate(

        { name: "student" },

        { $inc: { sequenceValue: 1 } },

        {

            new: true,

            upsert: true,

        }

    );

    const sequence = counter.sequenceValue

        .toString()

        .padStart(4, "0");


    const year = new Date().getFullYear();

    return `STU${year}${sequence}`;
};

const generateTeacherId = async () => {

    const counter = await Counter.findOneAndUpdate(

        { name: "teacher" },

        { $inc: { sequenceValue: 1 } },

        {

            new: true,

            upsert: true,

        }

    );

    const sequence = counter.sequenceValue

        .toString()

        .padStart(4, "0");


    const year = new Date().getFullYear();

    return `TCH${year}${sequence}`;

};

const generateAdminId = async () => {

    const counter = await Counter.findOneAndUpdate(

        { name: "admin" },

        { $inc: { sequenceValue: 1 } },

        {

            new: true,

            upsert: true,

        }

    );

    const sequence = counter.sequenceValue

        .toString()

        .padStart(4, "0");


    const year = new Date().getFullYear();

    return `ADM${year}${sequence}`;

};

module.exports = {

    generateStudentId,
    generateTeacherId,
    generateAdminId,

};
