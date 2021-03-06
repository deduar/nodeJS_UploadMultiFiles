const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Setings
app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middelwares externas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/',require('./routes/root'));
app.use('/upload',require('./routes/upload'));
app.use('/process',require('./routes/process'));
app.use('/vehicle',require('./routes/vehicle'));
app.use('/consult',require('./routes/consult'));
app.use('/posts',require('./routes/posts'));
app.use('/migrate',require('./routes/migrate'));


//404 handler
app.use((req,res,next) => {
    res.status(404).send('404 not found');
});

// Static
app.set(express.static(path.join(__dirname,'public')));

module.exports = app;