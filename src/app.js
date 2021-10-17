const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const sendEmail = require('./sendGrid/sendEmail');


/*********************/
// EXPRESS APP
const app = express();

// SET PORT
const customPort = process.env.CUSTOM_PORT;
const PORT = process.env.PORT || customPort;
app.set('port', PORT);

/*********************/
// MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*********************/
// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/', async (req, res) => {
    try {
        const { email, name, lastname } = req.body;

        // Verificamos que se envien todos los datos
        if (!email || !name || !lastname) {
            const error = new Error("No enviaste todos los datos necesarios.");
            error.status = 400;
            throw error;
        }

        // sendgrid registration email
        await sendEmail(email, name, lastname);
        res.send('Email enviado!');
        
    } catch (error) {
        next(error);
    }
});



/*********************/
// ERROR HANDLING
// Error 404
app.use((req, res, next) => {
    const error = new Error("El recurso solicitado no existe.");
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ 'Error': error.message || 'Internal Server Error.' });
    console.log(error.message);
});

/*********************/
module.exports = app;