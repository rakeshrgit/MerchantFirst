import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './form';
import Input from './input';
import Loader from "../../images/loader.gif";

import {Redirect} from 'react-router-dom'

class Login extends Form {
    state = { 
        newdata:{
            username:'',
            password:''
           
        },
        userNiceName:'',
        loggedIn:false,
        loading:false,
        errors:{
            
        }
     };
     schema={
         username: Joi.string().required().label('Username'),
         password: Joi.string().required().label('Password'),
         
        // email: Joi.string().email({ minDomainAtoms: 2 })
     };
    
    
    doSubmit = () => { 
        // call the server
       // console.log('Submited')
    }


  
    render() { 
      
       
        const { newdata, errors, loggedIn, userNiceName, loading } = this.state
        //const user = userNiceName ? userNiceName : localStorage.getItem('userName')
		if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return <Redirect to={`/dashboard`} noThrow/>
        }
        else {
        return ( 
            <React.Fragment>
                <div className="container">
      
                    
                    <form onSubmit={this.handleSubmit}>
                        <Input 
                            name='username' 
                            value={newdata.username} 
                            label='Username' 
                            onChange={this.handleChange}
                            type='text'
                            error={errors.username}
                        />
                  
                         <Input 
                            name='password' 
                            value={newdata.password} 
                            label='Password' 
                            onChange={this.handleChange}
                            type='password'
                            error={errors.password}
                        />
                        {/* <Input 
                            name='email' 
                            value={newdata.email} 
                            label='Email' 
                            onChange={this.handleChange}
                            type='email'
                            error={errors.email}
                        /> */}
                        {this.renderButton('Login')}
                        { loading && <img className="loader" src={Loader} alt="Loader"/> }
                    </form>
                </div>
            </React.Fragment>
         );
                    }
    }
}
 
export default Login;