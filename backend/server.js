const express = require('express');

/* Cross-Origin Resource Sharing (CORS) is a mechanism 
that uses additional HTTP headers to tell browsers to 
give a web application running at one origin, 
access to selected resources from a different origin */
const cors = require('cors')

//This will be essential in connecting the server to the mongodb database
const mongoose = require('mongoose')

require('dotenv').config();

///This is how we create an express server and specify the port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

//This is where we collect our database URI
const uri = process.env.ATLAS_URI;
//We then do the connection
mongoose.connect(uri, {useNewUrlParser: true, 
                        useCreateIndex:true,
                     useUnifiedTopology: true});

//This is just a method to check
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully")
})

//This is the place we are pushing our data
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// The server is set up and running
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});