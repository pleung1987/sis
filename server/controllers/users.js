console.log("got into the users.js controller");
const nodemailer = require('nodemailer')
var mongoose = require("mongoose")
var User = mongoose.model('User')

module.exports = {
    create: function(req,res){
        User.create(req.body, function(err, result){
            console.log('got into the /send route passing in:', req.body);
            var user = new User(req.body);
            console.log('this is the user var:', user);
            if(err){
                console.log('error trying to create:', err);

                res.render('contact', {msg: err.message})
            } else {
                console.log("success user submitted:", result);

                const output = `
                    <p>You have an Beta Tester Request:</p>
                    <h3>Contact Details</h3>
                    <ul>
                    <li>Name: ${req.body.name} </li>
                    <li>Email: ${req.body.email} </li>
                    </ul>
                    <h3>Message</h3>
                    <p> ${req.body.name} is interested in signing up for beta testing! </p>
                `;

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    host: 'smtp.gmail.com',
                    port:  587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'SenseinSilico@gmail.com', // generated ethereal user
                        pass: 'Hongkong88' // generated ethereal password
                    },
                    tls:{
                    rejectUnauthorized: true   //if you are sending it from local host
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"SIS BetaTester" <SenseinSilico@gmail.com>', // sender address
                    to: 'patrick@senseinsilico.com', // list of receivers
                    subject: 'Interested Beta Tester Lead', // Subject line
                    text: 'Hello world?', // plain text body
                    html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    res.render('sent', {msg:'Beta test request has been sent'})
                    });
                }

        })
    },

}