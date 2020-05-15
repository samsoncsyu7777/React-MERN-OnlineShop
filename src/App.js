import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //make hyperlink of the elements
import "./App.css";
import Login from "./components/login"; //login page
import Join from "./components/join"; //join page
import Logined from "./components/logined"; //logined page
import Checkout from "./components/checkout"; //logined page
import CheckoutForm from "./components/checkoutForm";
import Order from "./components/order"; //previous order page
import logo from "./components/images/logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container"> {/* web container */}
          {/* NAV: logo and title */}
          <nav className="navbar">
            <a className="navbar-brand">
              <img src={logo} className="logo" alt="Coffee" />
            </a>
            <Link to="/" className="navbar-brand">Faithful Cafe</Link>
          </nav>
          <br/>
          <Route path="/" exact component={Login} /> {/* login page */}
          <Route path="/join" component={Join} />
          <Route path="/logined" component={Logined} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order" component={Order} />
        </div>
        <div className="left" />
        <div className="right" />
        <div className="top" />
        <div className="bottom" />
      </Router>
    );
  }
}

export default App;
