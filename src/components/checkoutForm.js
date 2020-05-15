import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'

const CheckoutForm = ({ email,
                        total,
                        date,
                        address,
                        tel,
                        cappuccinoS,
                        espressoS,
                        latteS,
                        bubbleteaS,
                        mangosmoothieS,
                        strawberrysmoothieS,
                        stripe}) => {
  if (total == 0) {
    history.push('/')
    return null
  }

  const [receiptUrl, setReceiptUrl] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()
    const { token } = await stripe.createToken()
    const order = await axios.post('http://24.57.111.188:7000/api/stripe/charge', {
      amount: total.toString().replace('.', ''),
      source: token.id,
      receipt_email: email
    })
    setReceiptUrl(order.data.charge.receipt_url)
  }

  if (receiptUrl) {
    const newOrder = {
      order_number: 1,
      order_email: email,
      order_address: address,
      order_tel: tel,
      order_date: date,
      order_cappuccinoS: cappuccinoS,
      order_espressoS: espressoS,
      order_latteS:latteS,
      order_bubbleteaS: bubbleteaS,
      order_mangosmoothieS: mangosmoothieS,
      order_strawberrysmoothieS: strawberrysmoothieS,
      order_total: total
    };

    axios.post('http://24.57.111.188:4000/todos2/user/addOrderList', newOrder)
      .then(res => console.log(res.data));
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <label className="loginLabel">
          Card details
          <CardNumberElement className="payControl" />
        </label>
        <p />
        <label className="loginLabel">
          Expiration date
          <CardExpiryElement className="payControl" />
        </label>
        <p />
        <label className="loginLabel">
          CVC
          <CardCVCElement className="payControl" />
        </label>
        <p />
        <button type="submit">
          Pay
        </button>
      </form>
    </div>
  )
}

export default injectStripe(CheckoutForm)
