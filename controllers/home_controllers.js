const Post = require('../models/post');
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('name_id', 11);
    // res.end('<h1> Express is up for codeial </h1>');
Post.find({}, function(err,posts){
    return res.render('home',{
        title:"Codeial | Home",
        posts: posts
    });
});
    
}
