const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express()
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())  

const works = 'It Works'
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

router.get('/', (req, res) => { 
    const abPath = __dirname + '/views/index.html';

  router.use("/public", express.static(__dirname + "/public"));
  res.sendFile(abPath);
  
  router.get('/json', (req, res) =>{
    if(process.env.MESSAGE_STYLE === uppercase){
      res.json({message: 'HELLO JSON'})
    }else{
      res.json({message: 'Hello json'})
    }
})
});

router.get('/now', (req, res, next)=>{
  req.time = new Date().toString();
  next()
  }, (req, res)=>{
    res.send({time: req.time})
})



router.post("/name", (req, res)=>{
  let email = req.body.email;
  let ht_ml = req.body.html;
  let subject = req.body.subject;
  let from = req.body.from;
  // Email Body
  let message = {
    from: `${from} <${process.env.EMAIL}>`,
    to: `Recipient <${email}>`,
    subject: `${subject}`,
    text: 'Hello to myself',
    html: `${ht_ml}`
};
// send Result to Email
transporter.sendMail(message, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }
    console.log('Message sent')
});
// Print out JSON
  res.json({name: `${email} ${subject}`})
})





router.use((req, res, next)=>{
  const methods = req.method + " " + req.path + " - " + req.ip;
  console.log(methods)
  next()
 })

module.exports = router;