const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema(

    {

        userId: {

            type:

            mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            unique: true,

        },


        employeeId: {

            type: String,

            required: true,

            unique: true,

            trim: true,

        },


        designation: {

            type: String,

            required: true,

            trim: true,

        },


        department: {

            type: String,

            required: true,

            trim: true,

        },


        permissions: {

            manageStudents: {

                type: Boolean,

                default: false,

            },

            manageTeachers: {

                type: Boolean,

                default: false,

            },

            manageSubjects: {

                type: Boolean,

                default: false,

            },

            manageAttendance: {

                type: Boolean,

                default: false,

            },

            manageMarks: {

                type: Boolean,

                default: false,

            },

            manageAssignments: {

                type: Boolean,

                default: false,

            },

            managePlacements: {

                type: Boolean,

                default: false,

            },

            manageMarketplace: {

                type: Boolean,

                default: false,

            },

            manageEvents: {

                type: Boolean,

                default: false,

            },

        },


        avatar: {

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

const Admin = mongoose.model(

    "Admin",

    adminSchema

);

module.exports = Admin;
