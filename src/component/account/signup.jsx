import React from 'react';
import Form from './../../common/form';
import { signUp } from "../../services/authService";
import Joi from 'joi-browser';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Loader from "../../images/loader.gif";
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
        loggedIn:false,
        success:false,
        loading:false
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
      this.setState({loading:true})  
      await signUp(JSON.stringify(account)).then(response => {
        if (response.status === 201 ) {
          console.log("signUp Data: ", response.data);
           // return <Redirect to={`/dashboard`} noThrow/>
            //const responseData = response.data;
            //window.location.href = "/success";
            this.setState({loading:false, success:true})
          
          if (!response.data.status) {
           
          }
        }
      });
    } catch (err) {
        this.setState({loading:false, error:true})
    }
     }
    
    render() { 
        const { loggedIn, loading, success, error } = this.state
        
        if(!loading && success){
           return  <Redirect to={`/success`} noThrow/>          
        }
        if(!loading && error){
            return <div className="pt-5 pb-5"><div class="s-error">Something went wrong please try again</div></div>    
        }
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
                            { loading && <img className="loader" src={Loader} alt="Loader"/> }
                            <div className="mt-4 d-account">Already have an account? <NavLink to="/login">Log in</NavLink></div>
                        </div>
                    </div>    
                </div>
            );
        }

        
    }
}
 
export default Signup;