const express = require('express');

const port = 8000;
 const app = express();

 // use express router
 app.use('/',require('./routes'));
 // set up the view engine
app.use('view engine', 'ejs');
app.use('views','./views');

 app.listen(port,function(err){
    if(err){
        console.log(`error in running server: ${err}`);
    }
    console.log(`Server is Running on port: ${port}`);
 })