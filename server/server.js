require('./models/db')
const express = require('express')
const cors = require('cors')
const router = require('./routes/routes')
const app = express()
const nodemailer = require('nodemailer');
const { db } = require('./models/models');
// const amqp = require('amqp');

app.use(express.json())
app.use(cors())
app.use('/', router)

app.post("/sendmail", cors(), async (req, res) => {
    let { text } = req.body
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e5eb1ee7ad7bce",
            pass: "12d337c484fab6"
        }
    });
    await transport.sendMail ({
        from: "<dsa.sda.2023@mail.ru>",
        to: "emmonity@bk.ru",
        subject: "Congratulation",
        text: "Hallo",
        html: "<h1>Guten Tag </h1>"
    })

})
app.listen('8000', err => {
    if (err) console.log(err)
    console.log('server is started at PORT number: 8000')
})
// PUB
// amqp.createConnection('ampq://localhost', (err, connection)=>{
//     if(err){
//         throw err;
//     }
//     connection.createChannel((err, channel)=>{
//         if(err){
//             throw err;
//         }
//         let queueName = "technical";
//         let message = "This is technical Babaji";
//         channel.assertQueue(queueName, Buffer.from(message));
//         setTimeout(()=>{
//             connection.close();
//         },1000)
//     })
// })


// SUB
// const amqp = require('amqp/callback_api');
// amqp.createConnection('ampq://localhost', (err, connection)=>{
//     if(err){
//         throw err;
//     }
//     connection.createChannel((err, channel)=>{
//         if(err){
//             throw err;
//         }
//         let queueName = "technical";
//         channel.assertQueue(queueName, {
//     durable:false
// }
//        channel.consume(queueName,(msg) =>{
//            console.log('Recieved:' + msg.content.toString());
//        })
//     })
// })