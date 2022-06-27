
// const { model } = require("mongoose");
const User = require('../models/user');
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
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing Up',err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing Up',err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
    
}
//get the sign in data
module.exports.createSession = function(req,res){
    //TODO
}
