import React, { Component, useContext } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			username:'',
			password:'',
			userNiceName:'',
			userEmail:'',
			loggedIn:false,
			loading:false,
			error:'',
			redirect:false

		};
	  }
	  onFormSubmit = (event) =>{
		  event.preventDefault();
		 // console.log(this.state)	
		 const siteURL = 'http://www.w3standards.in/';	
		 const loginData ={
			 username:this.state.username,
			 password:this.state.password
		 };
		 this.setState({loading:true},() =>{
			 axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, loginData)
			 .then(res =>{
                 console.log('Response Date',res.data)
				if(undefined === res.data.token ){
					this.setState({error:res.data.message, loading:false})
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
				 //this.setState({error:err.res.data, loading:false})
			 })
		 })
	  }
	  handleOnChange = (event) =>{
		this.setState({[event.target.name]:event.target.value})
		console.log(this.state)
	  };
	render() { 
		const {username, password, loggedIn, userNiceName} = this.state;
		const user = userNiceName ? userNiceName : localStorage.getItem('userName')


		if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return <Redirect to={`/Dashboard/${user}`} noThrow/>
		}
		else{
			return ( 
				<React.Fragment>
					<main className="wrapper">
						<form onSubmit={this.onFormSubmit}>
							<label className="form-group">
								Username:
								<input 
									type='text'
									className='form-control'
									name='username'
									value={ username }
									onChange ={this.handleOnChange}
								/>
							</label>
							<br/>
							<label className="form-group">
								Password:
								<input 
									type='password'
									className='form-control'
									name='password'
									value={ password }
									onChange ={this.handleOnChange}
								/>
							</label>
							<br/>
							<button className="btn btn-success btn-sm" type="submit">Login</button>
						</form>
					</main>
				</React.Fragment>
			 );
		}
		
	}
}
 
export default LoginForm;