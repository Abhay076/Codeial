{
    //method to submit the form data  for new post using AjAX
   let createPost = function(){
     let newPostForm = $('#new-post-form');

     newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                new Noty({
                    theme: 'relax',
                    text: "Post published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
                let newPost = newPostDom(data.data.post);
                console.log(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));

                 // call the create comment class
                 new PostComments(data.data.post._id);
                 new ToggleLike($(' .toggle-like-button', newPost));
            }, error: function(error){
                console.log(error.responseText);
            }
        });
     });

   }
   
   //METHOD TO CREATING POST USING in DOM
   let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
        ${post.content}
        <br>
        <small>
            ${post.user.name}
        </small>
        <br>
        <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
        0 Likes
        </a>      
        </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" id="" placeholder="type here to add comment... " required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
            <div class="post-comments-list">
                 <ul id="post-comments-${post._id}">

                 </ul>
            </div>
        </div>
     </li>`)
   }
// method to delete a post from DOM
     let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                 // used for notfication using noty
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
     }


      // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    // let convertPostsToAjax = function(){
    //     $('#posts-list-container>ul>li').each(function(){
    //         let self = $(this);
    //         let deleteButton = $(' .delete-post-button', self);
    //         deletePost(deleteButton);

    //         // get the post's id by splitting the id attribute
    //         let postId = self.prop('id').split("-")[1]
    //         // new PostComments(postId);
    //         new PostComments(postId);
    //     });
    // }

// // function to submit the form data for new comment using AJAX
let createComment = function(PostId){
    let comments = $(`post-comment-${PostId}`);
    console.log(comments);
    let commentForm = $(`#add-comment-form-${ PostId }`);
    console.log(commentForm);
    commentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/comments/create',
            data: commentForm.serialize(),
            success: function(data){
                console.log(data);
                let newComment = newCommentDOM(data.data.comment);
                $(`#post-comment-${ PostId }`).prepend(newComment);
                console.log(data.data.post._id);
                deleteComment($('.delete-comment-btn', newComment));
                createComment(data.data.post._id);
            },error: function(err){
                console.log(err);
            }
        });
    });
}

// method to create comment in DOM
let newCommentDOM = function(comment){
    return $(`<li id="comment-${ comment._id }">
                <div class="comment-card">
                    <div class="comment-title">
                        <p>
                            ${ comment.user.name }
                        </p>
                        <a class="delete-comment-btn" href="/comments/destroy/${ comment._id }">
                            <p>X</p>
                        </a>
                    </div>
                    <div class="comment-content">
                        <p>
                        ${ comment.content }
                        </p>
                    </div>
                </div> 
            </li>`);
}

let deleteComment = function(deleteLink){
    console.log('deleteLink');
    console.log(deleteLink);
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                console.log(data);
                $(`#comment-${ data.data.comment_id }`).remove();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}



function convertPoststoAJAX(){
    $('#post-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-btn', self);
        deletePost(deleteButton);
        let postId = self.prop('id').split('-')[1];
        // $(`#post-comment-${ i._id }`);
        $(`#post-comment-${ postId }>li`).each(() => {
            console.log(this);
            deleteComment($(' .delete-comment-btn', this));
        });
        createComment(postId);
    });
}






createPost();
convertPoststoAJAX();
    

    // createPost();
    // convertPostsToAjax();

}