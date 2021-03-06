import express from "express";
import sendgridMail from "@sendgrid/mail";
// T&hE9mDM@Punch1122
const router = express.Router();

router.post('/:action', async (req, res, next) => {
    let action = req.params.action;
    let recipients = req.body.recipients
    let list = recipients.split(',')
    console.log(req.body)
    console.log(list)

    if (action === 'send') { // send email

        sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: list,
            from: 'elishabello2020@gmail.com', // Use the email address or domain you verified above
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.content,
        };

        try {
            const response = await sendgridMail.send(msg, true);
            return res.status(200).json({
                confirmation: 'success',
                response: response
            })
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
                return res.status(400).json({
                    confirmation: 'fail',
                    message: error.response.body
                })
            }
            return res.status(400).json({
                confirmation: 'fail',
                message: error
            })
        }
    }

    return res.status(400).json({
        confirmation: 'fail',
        message: 'error'
    })
})

// router.get('/:action', async (req, res, next) => {
//     let action = req.params.action;
//
//     if (action === 'send') { // send email
//
//         sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
//         const msg = {
//             to: 'elishabello2014@gmail.com',
//             from: 'elishabello2020@gmail.com', // Use the email address or domain you verified above
//             subject: 'Sending with Twilio SendGrid is Fun',
//             text: 'and easy to do anywhere, even with Node.js',
//             html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//         };
//
//         try {
//             const response = await sendgridMail.send(msg);
//             return res.status(200).json({
//                 confirmation: 'success',
//                 response: response
//             })
//         } catch (error) {
//             console.error(error);
//             if (error.response) {
//                 console.error(error.response.body)
//                 return res.status(400).json({
//                     confirmation: 'fail',
//                     message: error.response.body
//                 })
//             }
//             return res.status(400).json({
//                 confirmation: 'fail',
//                 message: error
//             })
//         }
//     }
//
//     return res.status(400).json({
//         confirmation: 'fail',
//         message: 'error'
//     })
//
//
// })


export default router;
