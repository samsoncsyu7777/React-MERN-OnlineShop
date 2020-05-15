const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderList = new Schema({
    order_number: {
        type: Number
    },
    order_email: {
        type: String
    },
    order_address: {
        type: String
    },
    order_tel: {
        type: String
    },
    order_date: {
        type: String
    },
    order_cappuccinoS: {
        type: Number
    },
    order_espressoS: {
        type: Number
    },
    order_latteS: {
        type: Number
    },
    order_bubbleteaS: {
        type: Number
    },
    order_mangosmoothieS: {
        type: Number
    },
    order_strawberrysmoothieS: {
        type: Number
    },
    order_total: {
        type: Number
    }


});

module.exports = mongoose.model('OrderList', OrderList);
