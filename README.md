# React-MERN-OnlineShop
React online shop front-end design, Node server with Express connected to Mongo Database.
MERN Online Shop Design Project.
Front-end:
-App.js: Logo and Company Name on the top with routing to other file for rendering the webpage body.
-login.js: rendering the products, authenticating the email and password at the server. This page will pass the email to the props of the Logined page.
-join.js: validating the format of the email and password at front-end. Verificating new email address at the server. The server sends a password to verificate the new user's email and posts the new user's information to the Mongo Database.
-logined.js: customers can add and delete items for their orders. They can also check their previous orders. For the security, the email props will be deleted after logging out. This page will pass the email and the information of the order to the Checkout page.
-checkout.js: customers input their contact address and phone numbers here. Checkout date is recorded here and sent with other information of the order to Checkout Form.
-checkoutForm.js: for the user's privacy, Stripe is used to handle customers' confidental data and the procedures of online payment.
-order.js: using Axios, fetching the previous order of the customer only and rendering the data on tables.
Back-end:
-server listens on the port 4000 for fetching data and sending email.
-server listens on the port 7000 for Stripe online payment.
-server connects to the Mongo Database with Mongoose.
-Mongo database has 2 collections with 2 models in the server for the storage of the information of the users and orders.
