const dotenv = require('dotenv').config()
const express = require('express')
const expressLayouts= require('express-ejs-layouts')
const methodOverride = require("method-override");
const connectDb = require("./server/config/db")

const session = require('express-session');
// Sessions are used to store user-specific data, such as authentication status and user preferences, across multiple requests
const passport = require('passport');
// Passport is an authentication middleware hat is commonly used with Express. It provides a flexible and modular framework for implementing various authentication strategies, such as local authentication (username and password), OAuth, and more.
const MongoStore = require('connect-mongo');
// This is a session store for Express.js that allows you to store session data in a MongoDB database. It's often used in conjunction with express-session to store session information in a scalable and persistent data store, which is particularly useful in production environments.

const app = express()
const port = 5000 || process.env.PORT;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  // cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));


// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// This is commonly used for processing form data and JSON data sent in HTTP requests.
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"));
// static files
app.use(express.static('public'));
// static files can include things like CSS, JavaScript, images, and more.By using this middleware, you make these files accessible to clients via the specified route. For example, a file in the "public" directory could be accessed via http://yourdomain.com/public/filename.ext

// connect6 database
connectDb()

// templating engine
app.use(expressLayouts);
// It enables you to create and use layout templates for your views.
app.set('layout', './layouts/main');
// specify the default layout file to be used. In this case, the layout file is "./layouts/main".
app.set('view engine', 'ejs');

// routes
app.use('/',require('./server/routes/index'))
app.use('/',require('./server/routes/dashboard'))
app.use('/', require('./server/routes/auth'));

// this should be last route
// Handle 404
app.get('*', function(req, res) {
  //res.status(404).send('404 Page Not Found.')
  res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });