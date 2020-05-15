import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.onClickBack = this.onClickBack.bind(this);
    this.state = {
      orders: [],
      email: ""
    };
  }

  componentDidMount() {
    var tmp = this.props.location.state.email;
    this.setState({ email: this.props.location.state.email});
    axios.post('http://24.57.111.188:4000/todos2/user/orderlist', {order_email: tmp})
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(function (error){
        console.log(error);
      })
  }

  onClickButton(e) {
    e.preventDefault();
  }

  onClickBack(e) {
    e.preventDefault();

    this.props.history.push({
      pathname: '/logined',
      state: {email: this.state.email}
    });
   }

  render() {
    return (
      <div className="orderDiv">
        <label className="loginedLabel">{this.state.email}, welcome!</label>
        <button onClick={this.onClickBack} className="joinButton" style={{color: '#ffaa44', backgroundColor: 'rgba(0,0,0,0)'}}> Back </button>
        <br />
        <p className="joinLabel" >Your Previous Orders</p>
        <OrderList orders={this.state.orders} />
      </div>
    )
  }
}

class OrderList extends React.Component {
  render() {
    return (
      <div>
        {this.props.orders.map((order, i) => (
          <OneOrder key={i} data={order} />
        ))}
      </div>
    );
  }
}

class OneOrder extends React.Component {
  render() {
    return (
      <div>
        <a className="joinLabel">Date: {this.props.data.order_date}</a><br />
        <a className="joinLabel">Cappuccino x {this.props.data.order_cappuccinoS}</a><br />
        <a className="joinLabel">Espresso x {this.props.data.order_espressoS}</a><br />
        <a className="joinLabel">Latte x {this.props.data.order_latteS}</a><br />
        <a className="joinLabel">Bubbble Tea x {this.props.data.order_bubbleteaS}</a><br />
        <a className="joinLabel">Mango Smoothie x {this.props.data.order_mangosmoothieS}</a><br />
        <a className="joinLabel">Strawberry Smoothie x {this.props.data.order_strawberrysmoothieS}</a><br />
        <p />
      </div>
    );
  }
}
