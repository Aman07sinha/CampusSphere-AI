const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(

    {

        userId: {

            type:

            mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            unique: true,

        },

        enrollmentNumber: {

            type: String,

            required: true,

            unique: true,

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

        section: {

            type: String,

            trim: true,

        },

        batch: {

            type: String,

            required: true,

        },

        cgpa: {

            type: Number,

            min: 0,

            max: 10,

            default: 0,

        },

        skills: [

            {

                type: String,

                trim: true,

            }

        ],

        github: {

            type: String,

            default: "",

        },

        linkedin: {

            type: String,

            default: "",

        },

        portfolioUrl: {

            type: String,

            default: "",

        },

        resume: {

            type: String,

            default: "",

        },

        bio: {

            type: String,

            default: "",

        },

        profileCompleted: {

            type: Boolean,

            default: false,

        },

    },

    {

        timestamps: true,

    }

);


const Student = mongoose.model(

    "Student",

    studentSchema

);


module.exports = Student;
