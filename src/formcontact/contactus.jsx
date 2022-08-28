import React from 'react';
import Joi from 'joi-browser';
import Form  from '../common/form';

class ContactUs extends Form {
    state = { 
        data:{
            name:"",
            email:"",
            phone:"",
            
        },
        errors:{

        }
     }
     schema = {
        name:Joi.string().required().label('Name'),
        email:Joi.string().required().label('Email'),
        phone:Joi.string().required().label('Phone')
     }
     
   
    render() { 
        return (
            <div className="container">
            <form onSubmit={this.handleSubmitContact} autoComplete="off">
            {this.renderInput('name', 'Name', 'text')}
            {this.renderInput('email', 'Email', 'email')}
             {this.renderInput('phone', 'Phone', 'text')}
            {this.renderButton('Login')}    
            </form>

            </div>
        );
    }
}
 
export default ContactUs;