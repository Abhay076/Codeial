const Comment = require('../models/comment');

const Post = require('../models/post');

const commentsMailer = require('../mailers/comments_mailer');

const commentEmailworker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');
module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        console.log('reached controller********');
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            // console.log(comment);
            // comments = await comment.populate('user');
            comment = await comment.populate('user', 'name email');
            //  commentsMailer.newComment(comment);
           let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue');
                    return;
                }
                console.log('job enqueued', job.id);
            });
            if (req.xhr){
                    // Similar for comments to fetch the user's id!
                    comment = await comment.populate('user', 'name');
                // Similar for comments to fetch the user's id!
                // comment = await comment.populate('user').execPopulate();
                
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
            // req.flash('success','Comment published!');
          return  res.redirect('/');

        }
    }catch(err){
        // console.log('error',err);
        // return;
        req.flash('error',err);
        return res.redirect('back');
    }
   
}

module.exports.destroy = async function(req,res){
   try{
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
      let post =  Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});

         await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
         

         // send the comment id which was deleted back to the views
         if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Comment deleted"
            });
        }
      req.flash('success','comment deleted!');
        return res.redirect('back');
    }
    // else{
    //     req.flash('error','Unauthorized!');
    //     return res.redirect('back'); 
    // }
   }catch(err){
    //   console.log('error',err);
            req.flash('error',err);
             return;
   }
   
}