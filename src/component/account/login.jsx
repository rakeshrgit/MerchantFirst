import React, { Component } from "react";
//import "./account.scss";

import { Button, Alert } from "react-bootstrap";
//import lopginBg from "./images/lopginBg.jpg";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Loader from "../../images/loader.gif";


class Login extends Component {
  state = {
    account:{ 
    username:'',
    password:'',
   
  },
  userNiceName:'',
  userEmail:'',
  loggedIn:false,
  loading:false ,
  errors:''
  };

  onFormSubmit = async e =>{
    e.preventDefault();
    const siteURL = 'https://www.w3standards.in/'
    const loginData ={
      username:this.state.account.username,
      password:this.state.account.password
    };
    this.setState({loading:true},() =>{
      axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, loginData)
      .then(res =>{
        if(undefined === res.data.token ){
          this.setState({loading:false})
          //console.log()
          return;
          }
          //const user = jwt.verify(res.data.token);
         // console.log("varify token user", user) 
          localStorage.setItem('token', res.data.token);
				  localStorage.setItem('userName', res.data.user_nicename);
          this.setState({
            loading:false, 
            token:res.data.token,
            userNiceName:res.data.user_nicename,
            userEmail:res.data.user_email,
            loggedIn:true
          })
        //  console.log('Response Data',res.data )
        //console.log(res.data)
      })
      .catch(err =>{
        this.setState({errors:'Invalid Username and Password !', loading:false})
        //this.setState({errors:'Username and password does not match', loading:false})
      })
    })
   // const account = { ...this.state.account };
    // try {
    //   await login(account).then(response => {
    //     if (response.status === 200) {
    //       console.log("response:2 ", response.data);
    //       const responseData = response.data;
    //       console.log("responseData ", response.data);
    //       if (responseData.status) {
    //         localStorage.setItem('token', responseData.token);
		// 		    localStorage.setItem('userName', responseData.user_nicename);
    //         // const tokenKey = "key";
    //         // const tokenName = "name";
    //         // const tokenEmail = "email";
    //         // const tokenID = "id";
    //         // localStorage.setItem(tokenKey, responseData.access_token);
    //         // localStorage.setItem(tokenName, responseData.user.name);
    //         // localStorage.setItem(tokenEmail, responseData.user.email);
    //         // localStorage.setItem(tokenID, responseData.user.id);
    //         // window.location.href = "/cdt";
    //       } else {
    //         this.setState({ error: "Invalid Username and Password !" });
    //       }
    //     }
    //   });
    // } catch (err) {
    //   const tokenKey = "key";
    //   const tokenName = "name";
    //   const tokenEmail = "email";
    //   const tokenID = "id";
    //   localStorage.removeItem(tokenKey);
    //   localStorage.removeItem(tokenName);
    //   localStorage.removeItem(tokenEmail);
    //   localStorage.removeItem(tokenID);
    // }
  };
  disabledLogin() {
    const account = { ...this.state.account };
    if (account.username === "" || account.password === "") {
      return true;
    } else {
      return false;
    }
  }

  handleOnChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
   
    const {account} = this.state;
    const { errors, loggedIn, loading } = this.state
    //const user = userNiceName ? userNiceName : localStorage.getItem('userName')
    if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return <Redirect to={`/dashboard`} noThrow/>
        }
    else{
      return (
        <main className="main">
          <div className="f-account">   
            <div className="container">
              <div className="f-account-inner">
                {errors && <Alert variant={"danger"}>{errors}</Alert>}
                  <form onSubmit={this.onFormSubmit}>
                      <div className="form-group">
                        <label>Username</label>
                        <input 
                          type="text" 
                          className="form-control"
                          name='username'
                          value={account.username}
                          onChange={this.handleOnChange}
                          required
                          /> 
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input 
                          type="password" 
                          className="form-control"
                          name='password'
                          value={account.password}
                          onChange={this.handleOnChange}
                          required
                          /> 
                      </div>
                      <div className="form-group">
                      <Button
                          className="btn  btn-lg"
                        // onClick={this.submitLogin}
                        disabled={this.disabledLogin()}
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                      { loading && <img className="loader" src={Loader} alt="Loader"/> }
                      <div className="mt-4 d-account">Don't have an account yet? <NavLink to="/signup">Create Account</NavLink></div>
                  </form> 
                </div>
            </div>
          </div>
          
        </main>
      );
    }    
    
  }
}

export default Login;
