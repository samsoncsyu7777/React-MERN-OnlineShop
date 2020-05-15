import React, { useEffect, Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class Checkout extends Component {

  constructor(props) {
    super(props);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      email: "",
      cappuccinoS: 0,
      espressoS: 0,
      latteS: 0,
      bubbleteaS: 0,
      mangosmoothieS: 0,
      strawberrysmoothieS: 0,
      total: 0.0,
      address: "",
      tel: "",
      date: date
    };
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeTel(e) {
    var tmp = e.target.value;
    if (!/[A-Za-z]/g.test(tmp)) {
      this.setState({
        tel: e.target.value
      });
    }
  }

  componentDidMount() {
    this.setState({
      email: this.props.location.state.email,
      total: this.props.location.state.total,
      cappuccinoS: this.props.location.state.cappuccinoS,
      espressoS: this.props.location.state.espressoS,
      latteS: this.props.location.state.latteS,
      bubbleteaS: this.props.location.state.bubbleteaS,
      mangosmoothieS: this.props.location.state.mangosmoothieS,
      strawberrysmoothieS: this.props.location.state.strawberrysmoothieS
    });
  }

  render() {
    return (
      <div className="row">
        <div className="columnSmall">
          <p />
        </div>
        <div className="column">
          <p className="loginLabel">Amount: ${this.state.total}</p>
          <form>
            <a className="payLabel">Address</a>
            <br />
            <input
              type="text"
              className="payControl"
              value={this.state.address}
              placeholder="Street, City, Province"
              onChange={this.onChangeAddress}
            />
            <p />
            <a className="payLabel">Phone</a>
            <br />
            <input
              type="text"
              className="payControl"
              value={this.state.tel}
              placeholder="1234567890"
              onChange={this.onChangeTel}
            />
            <p />
          </form>
          <StripeProvider apiKey="pk_test_3zTTg4bJ4ju71hu6UfXEtfdh00PXhAsFJ0">
            <Elements>
              <CheckoutForm
                email={this.props.location.state.email}
                total={this.props.location.state.total}
                date={this.props.location.state.date}
                address={this.props.location.state.address}
                tel={this.props.location.state.tel}
                cappuccinoS={this.props.location.state.cappuccinoS}
                espressoS={this.props.location.state.espressoS}
                latteS={this.props.location.state.latteS}
                bubbleteaS={this.props.location.state.bubbleteaS}
                mangosmoothieS={this.props.location.state.mangosmoothieS}
                strawberrysmoothieS={this.props.location.state.strawberrysmoothieS}
              />
            </Elements>
          </StripeProvider>
        </div>
        <div className="column">
          <p className="payLabel">Date: {this.state.date}</p>
          <p className="payLabel">Your Order:</p>
          <p className="payLabel">Cappuccino x {this.state.cappuccinoS}</p>
          <p className="payLabel">Espresso x {this.state.espressoS}</p>
          <p className="payLabel">Latte x {this.state.latteS}</p>
          <p className="payLabel">Bubble Tea x {this.state.bubbleteaS}</p>
          <p className="payLabel">Mango Smoothie x {this.state.mangosmoothieS}</p>
          <p className="payLabel">Strawberry Smoothie x {this.state.strawberrysmoothieS}</p>
        </div>
      </div>
    )
  }
}
