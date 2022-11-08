import React from 'react';
import Form from './../../common/form';
import { signUp } from "../../services/authService";
import Joi from 'joi-browser';
import {Redirect} from 'react-router-dom'
import './account.css';
class Signup extends Form {
    state = { 
        data: {
            first_name:"",
            last_name:"",
            username:"",
            password:"",
            name:"",
            email : "",
            roles:""
        },
        errors:{

        },
        roles : [
            {
                _id:"editor",
                name:"Editor"
            },
            {
                _id:"subscriber",
                name:"Subscriber"
            }
        ],
        loggedIn:false
     } 
     schema = {
        first_name:Joi.string().required().label('First Name'),
        last_name:Joi.string().required().label('Last Name'),
        username:Joi.string().required().label('Username'),
        password:Joi.string().required().label('Password'),
        name:Joi.string().required().label('Name'),
        roles:Joi.string().required().label('Roles'),
        email:Joi.string().required().label('Email')
     }
     
     dosSbmit = async (e) => {
      
    const account = this.state.data;
    try {
      await signUp(JSON.stringify(account)).then(response => {
        if (response.status === 201 ) {
          console.log("signUp Data: ", response.data);
          if (response.data === 201) {
            return <Redirect to={`/dashboard`} noThrow/>
            //const responseData = response.data;
            //window.location.href = "/success";
          
          }
          if (!response.data.status) {
           
          }
        }
      });
    } catch (err) {}
     }
    
    render() { 
        const { loggedIn } = this.state
        if(loggedIn || localStorage.getItem( 'token' )){
            return <Redirect to={`/dashboard`} noThrow/>
        }
        else{
            return (
                <div className="f-account"> 
                    <div className="container">
                        <div className="f-account-inner">
                            <h3>Sign Up</h3>    
                            <form onSubmit={this.handleRegisterSubmit} autoComplete="off">
                            {this.renderInput('first_name', 'First Name', 'text')} 
                            {this.renderInput('last_name', 'Last Name', 'text')}      
                            {this.renderInput('username', 'Username', 'text')}
                            {this.renderInput('password', 'Password', 'password')}
                            {this.renderInput('name', 'Name')}
                            {this.renderInput('email', 'Email', 'email')}
                            {this.renderSelect('roles', 'Roles', this.state.roles)}
                            {this.renderButton('Submit')}    
                            </form>
                        </div>
                    </div>    
                </div>
            );
        }

        
    }
}
 
export default Signup;