import React from 'react';
import Form from './../../common/form';
import { signUp } from "../../services/authService";
import Joi from 'joi-browser';
class Signup extends Form {
    state = { 
        data: {
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
        ]
     } 
     schema = {
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
          if (response.data) {
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
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleRegisterSubmit} autoComplete="off">
                    {this.renderInput('username', 'Username', 'text')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderSelect('roles', 'Roles', this.state.roles)}
                    {this.renderButton('Login')}    
                    </form>
                </div>    
            </div>
        );
    }
}
 
export default Signup;