const { model } = require("mongoose");

module.exports.profile = function(req,res){
    // res.end('<h1> Users Profile </h1>');
    return res.render('user_profile',{
        title:"Users profile"
    });
}

// render page for Sign Up
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Sign | Up"
    });
}

// render pages for Sign In
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Sign | In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    //TODO
}
//get the sign in data
module.exports.createSession = function(req,res){
    //TODO
}
