const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
// const swaggerAutogen = require('swagger-autogen')()
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('./swagger_output.json')

require('dotenv').config();

const uri = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
})

// Middleware
const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded

// routes
app.use('/stores', require('./Routes/storesRoutes'));

let port = 8086;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})