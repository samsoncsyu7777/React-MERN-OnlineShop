import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cappuccino from "./images/cappuccino.jpg";
import espresso from "./images/espresso.jpg";
import latte from "./images/latte.jpg";
import bubbletea from "./images/bubbletea.jpg";
import mangosmoothie from "./images/mangosmoothie.png";
import strawberrysmoothie from "./images/strawberrysmoothie.jpg";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
//    users: [],
      validUser: false,
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
      cappuccino: 3.7,
      espresso: 3.5,
      latte: 3.9,
      bubbletea: 3.3,
      mangosmoothie: 4.1,
      strawberrysmoothie: 4.1
    };
  }

  onChangeEmail(e) {
    var tmp = e.target.value;
    this.setState({
      email: tmp,
      emailCounter: this.state.emailCounter - 20,
      emailRed: `rgb(${this.state.emailCounter}, 238, 150)`,
      emailValid: ( /^\S+@\S+\.\S+$/.test(tmp)) ? true : false,
      valid0: ( /^\S+@\S+\.\S+$/.test(tmp)) ? "This email is valid." : "It should be like name@example.com"
    });
  }

  onChangePassword(e) {
    var tmp = "";
    if( e.target.value.length > this.state.password.length ) {
      tmp = this.state.password + e.target.value[e.target.value.length -1];
    }else {
      tmp = this.state.password.slice(0,-1);
    }
    this.setState({
      password: tmp,
      passwordStars: "*********************************************".substr(0,tmp.length),
      passwordCounter: this.state.passwordCounter - 20,
      passwordGreen: `rgb(255, ${this.state.passwordCounter}, 150)`,
    });
  }

  componentDidMount() {

  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('http://24.57.111.188:4000/todos2/user/valid', {user_email: this.state.email, user_password: this.state.password})
      .then(response => {
        this.setState({
          validUser: response.data.validUser
        }, () => {
          if (this.state.validUser) {
            this.props.history.push({
              pathname: '/logined',
              state: {email: this.state.email}
            });
          }else {
            this.setState({
              valid0: "Incorrect email or password."
            });
          }
        });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="loginDiv">
  	        <label className="loginLabel">Email:</label>
            <input
              type="text"
              className="loginControl"
              value={this.state.email}
		          style={{color: `${this.state.emailRed}`}}
		          placeholder="name@example.com"
              onChange={this.onChangeEmail}
            />
	          <label className="loginLabel">  Password:</label>
            <input
              type="text"
              className="loginControl"
              value={this.state.passwordStars}
		          style={{color: `${this.state.passwordGreen}`}}
		          placeholder="Your password"
              onChange={this.onChangePassword}
            />
            <input type="submit" value="Login" className="loginButton" />
            <Link to={"/join/"} className="joinButton" const email={this.state.email}> Join </Link>
            <br />
        		<label className="validLabel">{this.state.valid0}</label>
          </div>
        </form>
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
                <td className="description">Cappuccino ${this.state.cappuccino}</td>
                <td className="description">Espresso ${this.state.espresso}</td>
                <td className="description">Latte ${this.state.latte}</td>
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
                <td className="description">Bubble Tea ${this.state.bubbletea}</td>
                <td className="description">Mango Smoothie ${this.state.mangosmoothie}</td>
                <td className="description">Strawberry Smoothie ${this.state.strawberrysmoothie}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
