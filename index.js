const express = require('express');

const port = 8000;
 const app = express();

//use for render all css, js and image file using this 
app.use(express.static('./assets'));

//express ejs layouts
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(expressLayouts);

//extract style and scripts from sub pages into the layouts  
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

 // use express router
 app.use('/',require('./routes'));
 // set up the view engine
 app.set('view engine','ejs');
 app.set('views','./views');


 app.listen(port,function(err){
    if(err){
        console.log(`error in running server: ${err}`);
    }
    console.log(`Server is Running on port: ${port}`);
 })