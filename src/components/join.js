import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var randomPassword = 0;

export default class Join extends Component {

  constructor(props) {
    super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangePassword2 = this.onChangePassword2.bind(this);
      this.onChangeRegister = this.onChangeRegister.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        user_number: 0,
        email: "",
        password: "",
        passwordStars: "",
        password2: "",
        passwordStars2: "",
        emailCounter: 255,
        emailRed: `rgb(255, 238, 150)`,
        passwordCounter: 238,
        passwordGreen: `rgb(255, 238, 150)`,
        passwordCounter2: 238,
        passwordGreen2: `rgb(255, 238, 150)`,
        valid0: "It should be like name@example.com",
        valid1: "It must contain lower and upper case letters, numbers and special characters.",
        valid2: "The passwords should be the same.",
        emailValid: true,
        passwordValid1: true,
        passwordValid2: true,
        size:0,
        newEmail: true,
        sentNote: "",
        showRegister: false,
        registerPassword: ""
      };
  }

  onChangeEmail(e) {
    if (!this.state.showRegister) {
      var tmp = e.target.value;
      this.setState({
        email: tmp,
	      emailCounter: this.state.emailCounter - 20,
        emailRed: `rgb(${this.state.emailCounter}, 238, 150)`,
        emailValid: ( /^\S+@\S+\.\S+$/.test(tmp)) ? true : false,
	      valid0: ( /^\S+@\S+\.\S+$/.test(tmp)) ? "This email is valid." : "It should be like name@example.com"
      });
    }
  }

  onChangePassword(e) {
    if (!this.state.showRegister) {
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
        passwordValid1: ( /[!@#$%^&*(),.?:{}|<>]/g.test(tmp) && /[A-Z]/g.test(tmp) && /[a-z]/g.test(tmp) && /[0-9]/g.test(tmp) ) ? true : false,
        valid1: ( /[!@#$%^&*(),.?:{}|<>]/g.test(tmp) && /[A-Z]/g.test(tmp) && /[a-z]/g.test(tmp) && /[0-9]/g.test(tmp) ) ? "It is Valid!" : "It must contain lower and upper case letters, numbers and special characters.",
        passwordValid2: ( tmp == this.state.password2 ) ? true : false,
        valid2: ( tmp == this.state.password2 ) ? "OK! Both passwords are the same." : "The passwords should be the same."
      });
    }
  }

  onChangePassword2(e) {
    if (!this.state.showRegister) {
      var tmp = "";
      if( e.target.value.length > this.state.password2.length ) {
        tmp = this.state.password2 + e.target.value[e.target.value.length -1];
      }else {
        tmp = this.state.password2.slice(0,-1);
      }
      this.setState({
        password2: tmp,
        passwordStars2: "*********************************************".substr(0,tmp.length),
        passwordCounter2: this.state.passwordCounter2 - 20,
        passwordGreen2: `rgb(255, ${this.state.passwordCounter2}, 150)`,
        passwordValid2: ( tmp == this.state.password ) ? true : false,
        valid2: ( tmp == this.state.password ) ? "OK! Both passwords are the same." : "The passwords should be the same."
      });
    }
  }

  onChangeRegister(e) {
    var tmp = e.target.value;
    this.setState({registerPassword: tmp});
    if (tmp == randomPassword.toString()) {
    /*POST*/
      const newJoin = {
        user_number: this.state.size + 1,
        user_email: this.state.email,
        user_password: this.state.password
      };

      axios.post('http://24.57.111.188:4000/todos2/user/add', newJoin)
        .then(res => console.log(res.data));
      this.setState({
        password: '',
        passwordStars: '',
        password2: '',
        passwordStars2:''
      });
      this.props.history.push({
        pathname: '/',
        state: {email: this.state.email}
      });
    }
  }

  componentDidMount() {

  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('http://24.57.111.188:4000/todos2/user/new', {user_email: this.state.email})
      .then(response => {
        this.setState({
          valid0: response.data.msg,
          newEmail: response.data.newemail,
          size: response.data.size
        }, () => {
          if (this.state.emailValid && this.state.passwordValid1 && this.state.passwordValid2 && this.state.newEmail ) {
            this.setState({
              sentNote: "A register password is sent to your email.",
              showRegister: true
            });
            randomPassword = Math.floor(Math.random()*8899 + 1100);

                 //send email
            axios({
              method: "POST",
              url:"http://24.57.111.188:4000/send",
              data: {
                name: this.state.email,
                email: this.state.email,
                messageHtml: "Welcome! Your register password is " + randomPassword.toString(),
              }
            }).then((response)=>{
              if (response.data.msg === 'success'){
                alert("Email sent, awesome!");
              }else if(response.data.msg === 'fail'){
                alert("Oops, something went wrong. Try again")
              }
            })
          }
        });
      })
      .catch(function (error){
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="joinDiv">
        		<p className="joinP"/>
  	        <label className="joinLabel">Email:</label>
            <input type="text"
              className="joinControl"
              value={this.state.email}
     		      style={{color: `${this.state.emailRed}`}}
        		  placeholder="name@example.com"
              onChange={this.onChangeEmail}
            />
        		<br />
		        <label className="validLabel">{this.state.valid0}</label>
            <br />
		        <p className="joinP"/>
	          <label className="joinLabel">  Password:</label>
            <input type="text"
              className="joinControl"
              value={this.state.passwordStars}
		          style={{color: `${this.state.passwordGreen}`}}
		          placeholder="Your password"
              onChange={this.onChangePassword}
            />
		        <br />
		        <label className="validLabel">{this.state.valid1}</label>
            <br />
		        <p className="joinP"/>
	          <label className="joinLabel">  Confirm Password:</label>
            <input type="text"
              className="joinControl"
              value={this.state.passwordStars2}
		          style={{color: `${this.state.passwordGreen2}`}}
		          placeholder="Your password"
              onChange={this.onChangePassword2}
            />
		        <br />
		        <label className="validLabel">{this.state.valid2}</label>
            <br />
		        <p className="joinP"/>
            <input type="submit" value="Submit" className="joinButton2" />
            <label className="joinLabel">{this.state.sentNote}</label>
            <p className="joinP"/>
            {this.state.showRegister ? <label className="joinLabel">  Register Password:</label> : null}
            {this.state.showRegister ?  <input
              type="text"
              className="joinControl"
              value={this.state.registerPassword}
              placeholder="****"
              onChange={this.onChangeRegister}
            /> : null}
          </div>
        </form>
      </div>
    )
  }
}
