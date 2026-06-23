const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema(

    {

        subjectCode: {

            type: String,

            required: true,

            unique: true,

            trim: true,

        },

        subjectName: {

            type: String,

            required: true,

            trim: true,

        },

        branch: {

            type: String,

            required: true,

            trim: true,

        },

        semester: {

            type: Number,

            required: true,

            min: 1,

            max: 8,

        },

        credits: {

            type: Number,

            default: 3,

        },

        isActive: {

            type: Boolean,

            default: true,

        }

    },

    {

        timestamps: true,

    }

);
subjectSchema.index(
    { branch: 1, semester: 1, subjectCode: 1 }, 
    { unique: true }
);


const Subject = mongoose.model(

    "Subject",

    subjectSchema

);


module.exports = Subject;
