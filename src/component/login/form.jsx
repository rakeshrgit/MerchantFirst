import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios'
class Form extends Component {
    state = { 
        newdata:{},
        errors:{}
     }

     validate = () =>{
        const options = {abortEarly:false} 
        const { error } = Joi.validate(this.state.newdata, this.schema, options);
        //console.log(result)
        if(!error) return null;
        const errors = {};
        for (let item of error.details)
        errors [item.path[0]] = item.message;
        return errors;

     };
     validateProperty = ({  name, value }) =>{
        const obj = { [name]: value };
        const schema = {[name]: this.schema[name]}
        const {error} = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
      
    }
    handleSubmit = e =>{
        e.preventDefault();
        const errors = this.validate();
       // console.log(errors)
        this.setState({errors: errors || {} });
        if(errors) return;   
        this.validate();
        this.doSubmit();
        const siteURL = 'http://www.w3standards.in/';	
		 const loginData ={
			 username:this.state.newdata.username,
			 password:this.state.newdata.password
		 };
		 this.setState({loading:true},() =>{
			 axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, loginData)
			 .then(res =>{
                 console.log('Response Date',res.data)
				if(undefined === res.data.token ){
                    this.setState({errors:res.data.message, loading:false})
                    //console.log()
					return;
				}
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('userName', res.data.user_nicename);
				
				this.setState({
					loading:false, 
					token:res.data.token,
					userNiceName:res.data.user_nicename,
					userEmail:res.data.user_email,
					loggedIn:true
				})
				 //console.log(res.data)
			 })
			 .catch(err =>{
				 this.setState({errors:'Username and password does not match', loading:false})
			 })
		 })
        
    }
    handleChange = ({ currentTarget:input }) =>{
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const newdata = {...this.state.newdata};
        newdata[input.name] = input.value;
        this.setState({newdata, errors})
       // console.log(this.state.newdata)
    }
    // render() { 
    //     return ( 
    //         <React.Fragment>

    //         </React.Fragment>
    //      );
    // }
    renderButton(label){
        return (
            
            <button 
                disabled={this.validate()}
                type="submit" 
                class="btn btn-primary">
                    { label }
            </button>
            
        )
    }
    // render input


}
 
export default Form;