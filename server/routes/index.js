const express = require('express')
const router = express.Router()
const mainContoller = require("../controllers/mainController")

// app routes
router.get('/',mainContoller.homepage)
// route handler for a GET request to the root URL ("/") is defined to call the homepage function in the mainController object.
router.get('/about',mainContoller.about)


module.exports=router