const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express() 
const PORT = process.env.PORT || 3000;

const apiRoutes = require('/Develop/public/routes/api-routes');
const htmlRoutes = require('/Develop/public/routes/html-routes');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));



app.listen(PORT, function() {
    console.log('App listening on PORT:' + PORT);
});