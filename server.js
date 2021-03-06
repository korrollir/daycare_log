const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const helmet = require('helmet')
const toddlerEmailBuilder = require('./src/EmailTemplates/toddlerEmailBuilder')
const infantEmailBuilder = require('./src/EmailTemplates/infantEmailBuilder')
const PORT = process.env.PORT || 3000

require('dotenv').config()

const allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  next()
}

app.use(express.static(path.join(__dirname, '/src/dist')))
app.set('view engine', 'html')
app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
/* Security package for most vulneratbilities */
app.use(helmet())

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/api/sendmail/:age', (req, res) => {
  let htmlEmail

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: req.body.providerEmail,
      pass: req.body.providerPassword
    }
  })

  if (req.body.age === 'infant') {
    htmlEmail = infantEmailBuilder(req.body)
  } else {
    htmlEmail = toddlerEmailBuilder(req.body)
  }

  let mailOptions = {
    from: req.body.providerEmail,
    to: req.body.parentEmail,
    subject: req.body.name + ' - ' + req.body.today,
    html: htmlEmail
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
})

app.listen(PORT, function () {
  console.log('Server running on port: ', PORT)
})
