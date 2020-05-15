import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cappuccino from "./images/cappuccino.jpg";
import espresso from "./images/espresso.jpg";
import latte from "./images/latte.jpg";
import bubbletea from "./images/bubbletea.jpg";
import mangosmoothie from "./images/mangosmoothie.jpg";
import strawberrysmoothie from "./images/strawberrysmoothie.jpg";

export default class Logined extends Component {

  constructor(props) {
    super(props);
    this.onChangeAdd = this.onChangeAdd.bind(this);
    this.onChangeSubstract = this.onChangeSubstract.bind(this);
    this.signOut = this.signOut.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.order = this.order.bind(this);
    this.state = {
      email: "",
      password: "",
      passwordStars: "",
      emailCounter: 255,
      emailRed: `rgb(255, 238, 150)`,
      passwordCounter: 238,
      passwordGreen: `rgb(255, 238, 150)`,
      valid0: "It should be like name@example.com",
      valid1: "Incorrect password.",
      emailValid: true, passwordValid1: true,
      cappuccino: 3.79,
      espresso: 3.59,
      latte: 3.99,
      bubbletea: 3.39,
      mangosmoothie: 4.19,
      strawberrysmoothie: 4.19,
      total: 0.0,
      cappuccinoS: 0,
      espressoS: 0,
      latteS: 0,
      bubbleteaS: 0,
      mangosmoothieS: 0,
      strawberrysmoothieS: 0
    };
  }

  onChangeSubstract(e) {
    if (parseInt(e.target.dataset.productstate) > 0.5) {
      this.setState({
        [e.target.dataset.product]: parseInt(e.target.dataset.productstate) - 1,
        total: Math.round((this.state.total - parseFloat(e.target.dataset.price)) * 100) / 100
      });
    }
  }

  onChangeAdd(e) {
    this.setState({
      [e.target.dataset.product]: parseInt(e.target.dataset.productstate) + 1,
      total: Math.round((this.state.total + parseFloat(e.target.dataset.price)) * 100) / 100
    });
  }

  componentDidMount() {
    if (this.props.location.state.email == "") {
      this.props.history.push({
        pathname: '/',
        state: {email: ""}
      });
    }
    this.setState({email: this.props.location.state.email});
  }

  checkOut(e) {
    this.props.history.push({
      pathname: '/checkout',
      state: {
        email: this.state.email,
        total: this.state.total,
        cappuccinoS: this.state.cappuccinoS,
        espressoS: this.state.espressoS,
        latteS: this.state.latteS,
        bubbleteaS: this.state.bubbleteaS,
        mangosmoothieS: this.state.mangosmoothieS,
        strawberrysmoothieS: this.state.strawberrysmoothieS
      }
    });
  }

  order(e) {
    this.props.history.push({
      pathname: '/order',
      state: {
        email: this.state.email
      }
    });
  }

  signOut(e) {
    this.setState({
      email: ""
    });
    //remove the props
    this.props.history.push({
      pathname: '/logined',
      state: {email: ""}
    });
    this.props.history.push({
      pathname: '/',
      state: {email: ""}
    });
  }

  render() {
    return (
      <div>
        <div className="loginDiv">
          <label className="loginedLabel">{this.state.email}, welcome!</label>
          <label className="loginedLabel" style={{backgroundColor: '#eeee44', color: '#0000ff'}}>Total:${this.state.total}</label>
          <button onClick={this.checkOut} className="joinButton" style={{color: '#ffaa44', backgroundColor: 'rgba(0,0,0,0)'}}> Check out </button>
          <button onClick={this.order} className="joinButton" style={{color: '#ffaa44', backgroundColor: 'rgba(0,0,0,0)'}}> My Previous Order </button>
          <button onClick={this.signOut} className="joinButton" style={{color: '#ffaa44', backgroundColor: 'rgba(0,0,0,0)'}}> Sign out </button>
          <br />
        </div>
        <div className="photoDiv">
          <table className="photoList">
            <thead>
              <tr className="photoItem">
                <th className="photoBox">
                  <img src={cappuccino} className="photo" alt="cappuccino" />
                </th>
                <th className="photoBox">
                  <img src={espresso} className="photo" alt="espresso" />
                </th>
                <th className="photoBox">
                  <img src={latte} className="photo" alt="latte" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="photoDescription">
                <td align="center" className="tableContent">
                  <a className="description">Cappuccino ${this.state.cappuccino}</a>
                  <button
                    className="productButton"
                    data-product="cappuccinoS"
                    data-productstate={this.state.cappuccinoS}
                    data-price={this.state.cappuccino}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.cappuccinoS}</label>
                  <button
                    className="productButton"
                    data-product="cappuccinoS"
                    data-productstate={this.state.cappuccinoS}
                    data-price={this.state.cappuccino}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
                <td align="center" className="tableContent">
                  <a className="description">Espresso ${this.state.espresso}</a>
                  <button
                    className="productButton"
                    data-product="espressoS"
                    data-productstate={this.state.espressoS}
                    data-price={this.state.espresso}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.espressoS}</label>
                  <button
                    className="productButton"
                    data-product="espressoS"
                    data-productstate={this.state.espressoS}
                    data-price={this.state.espresso}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
                <td align="center" className="tableContent">
                  <a className="description">Latte ${this.state.latte}</a>
                  <button
                    className="productButton"
                    data-product="latteS"
                    data-productstate={this.state.latteS}
                    data-price={this.state.latte}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.latteS}</label>
                  <button
                    className="productButton"
                    data-product="latteS"
                    data-productstate={this.state.latteS}
                    data-price={this.state.latte}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
              </tr>
              <tr className="photoItem">
                <th className="photoBox">
                  <img src={bubbletea} className="photo2" alt="bubbletea" />
                </th>
                <th className="photoBox">
                  <img src={mangosmoothie} className="photo2" alt="mangosmoothie" />
                </th>
                <th className="photoBox">
                  <img src={strawberrysmoothie} className="photo2" alt="strawberrysmoothie" />
                </th>
              </tr>
              <tr className="photoDescription">
                <td align="center" className="tableContent">
                  <a className="description">Bubble Tea ${this.state.bubbletea}</a>
                  <button
                    className="productButton"
                    data-product="bubbleteaS"
                    data-productstate={this.state.bubbleteaS}
                    data-price={this.state.bubbletea}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.bubbleteaS}</label>
                  <button
                    className="productButton"
                    data-product="bubbleteaS"
                    data-productstate={this.state.bubbleteaS}
                    data-price={this.state.bubbletea}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
                <td align="center" className="tableContent">
                  <a className="description">Mango Smoothie ${this.state.mangosmoothie}</a>
                  <button
                    className="productButton"
                    data-product="mangosmoothieS"
                    data-productstate={this.state.mangosmoothieS}
                    data-price={this.state.mangosmoothie}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.mangosmoothieS}</label>
                  <button
                    className="productButton"
                    data-product="mangosmoothieS"
                    data-productstate={this.state.mangosmoothieS}
                    data-price={this.state.mangosmoothie}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
                <td align="center" className="tableContent">
                  <a className="description">Strawberry Smoothie ${this.state.strawberrysmoothie}</a>
                  <button
                    className="productButton"
                    data-product="strawberrysmoothieS"
                    data-productstate={this.state.strawberrysmoothieS}
                    data-price={this.state.strawberrysmoothie}
                    onClick={this.onChangeSubstract}
                  >-</button>
                  <label className="description">{this.state.strawberrysmoothieS}</label>
                  <button
                    className="productButton"
                    data-product="strawberrysmoothieS"
                    data-productstate={this.state.strawberrysmoothieS}
                    data-price={this.state.strawberrysmoothie}
                    onClick={this.onChangeAdd}
                  >+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
