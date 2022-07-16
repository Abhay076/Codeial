const nodemailer = require('../config/nodemailer');

//this is another wy of exporting a method
exports.newComment = (comment) => {
        console.log('Inside newComment mailer', comment);
        nodemailer.transporter.sendMail({
            from: 'yabhi6518@gmail.com',
            to: comment.user.email,
            subject: 'New Comment Published',
            html: '<h1> Yup, Your comment is now published! </h1>'
            
        },(err,info)=>{
            if(err){
                console.log('error in sending mail',err);
                return;
            }
            console.log('Message sent', info);
            return;
        });
    
}