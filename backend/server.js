const path = require('path');
const express = require('express');
const app = express();
const app2 = express();
const bodyParser = require('body-parser');
const postCharge = require('stripe');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
const nodemailer = require('nodemailer'); //send email
const creds = require('./config'); //send email
const port = process.env.PORT || 7000;

//credit card payment

todoRoutes.post('/stripe/charge', postCharge);
//todoRoutes.all('*', (_, res) =>
//  res.json({ message: 'please make a POST request to /stripe/charge' })
//)
app2.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
});
app2.use(bodyParser.json());
app2.use('/api', todoRoutes);
app2.use(express.static(path.join(__dirname, '../mern-todo-app/src/')));
app2.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../mern-todo-app/src/App.js'))
});
app2.listen(port, () => console.log(`server running on port ${port}`));
//credit card end

//send email
var transport = {
  host: 'smtp.gmail.com', // e.g. smtp.gmail.com
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}
var transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});
//send email end

let User = require('./user.model');
let OrderList = require('./orderlist.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos2', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/user/addOrderList').post(function(req, res) {

  let order = new OrderList(req.body);
  order.save()
    .then(todo => {
      res.status(200).json({'order': 'order added successfully'});
  })
    .catch(err => {
      res.status(400).send('adding new order failed');
  });
});

todoRoutes.route('/user/orderlist').post(function(req, res) {
  let email = req.body.order_email;
  OrderList.find({order_email: email}, function(err, orders) {
    res.json(orders);
  });
});

todoRoutes.route('/user/get').get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

//send email
app.use(express.json()); app.post('/send', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml
  var mail = {
    from: name,
    to: email,
    subject: 'Register Password',
    html: message
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
});

todoRoutes.route('/user/valid').post(function(req, res) {
  User.findOne({user_email: req.body.user_email, user_password: req.body.user_password}, function(err, user){
    if (user == null) {
      res.json({
        validUser: false
      })
    }else {
      res.json({
        validUser: true
      })
    }
  });
});

todoRoutes.route('/user/new').post(function(req, res) {
  let size = 0;
  User.count(function(err, count) {
    size = count;
  });
  User.findOne({user_email: req.body.user_email}, function(err, user) {
    if (user == null) {
//        one response only
      res.json({
        msg: 'This email is a new user.',
        newemail: true,
        size: size
      })
    }else {
//        one response only
      res.json({
        msg: 'This email has been used .',
        newemail: false,
        size: size
      })
    }
  });
});

todoRoutes.route('/user/add').post(function(req, res) {

  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'user': 'user added successfully'});
    })
    .catch(err => {
      res.status(400).send('adding new user failed');
    });
});


app.use('/todos2', todoRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
