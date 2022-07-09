{
    //method to submit the form data  for new post using AjAX
   let createPost = function(){
     let newPostForm = $('#new-post-form');

     newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                console.log(data);
            }, error: function(error){
                console.log(error.responseText);
            }
        });
     });

   }
   
   //METHOD TO CREATING POST USING DOM

   createPost();
}