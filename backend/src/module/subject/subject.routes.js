const express = require("express");


const {

    create,

    getAll,

    getBySemester,

} = require(

    "./subject.controller"

);


const {

    protect,

} = require(

    "../../middlewares/authmiddleware"

);


const {

    authorize,

} = require(

    "../../middlewares/rolemiddleware"

);


const router = express.Router();


// Admin Only

router.post(

    "/",

    protect,

    authorize("admin"),

    create

);


// Student / Teacher / Admin

router.get(

    "/",

    protect,

    authorize(

        "student",

        "teacher",

        "admin"

    ),

    getAll

);


// Semester Wise

router.get(

    "/semester",

    protect,

    authorize(

        "student",

        "teacher",

        "admin"

    ),

    getBySemester

);


module.exports = router;
