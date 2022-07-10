const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('name_id', 11);
    // res.end('<h1> Express is up for codeial </h1>');
// Post.find({}, function(err,posts){
//     return res.render('home',{
//         title:"Codeial | Home",
//         posts: posts
//     });
// });

try{
    //papulate the user of each post
let posts = await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path:'comments',
    populate: {
        path:'user'
    }
});
 let users = await User.find({});

 return res.render('home',{
    title:"Codeial | Home",
    posts: posts,
    all_users: users
});

}catch(err){
    console.log("error", err);
    return;
}

    
}
