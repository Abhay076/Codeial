
// const { model } = require("mongoose");
const User = require('../models/user');
module.exports.profile = function(req,res){
    // res.end('<h1> Users Profile </h1>');
    if(req.cookies.user_id){
       User.findById(req.cookies.user_id,function(err,user){
        if(user){
            return res.render('user_profile',{
                title:"Users Profile",
                user:user
            });
        }
        else{
            return res.redirect('/users/sign-in');
        }
       });
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
      // find the user
      User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
            // handle user not found
            return res.redirect('back');
        }


    });
}
