import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { isLoggedIn, getUserName } from '../function/function'
//import './scss/navbar.scss'
class Navbar extends Component {
	state = { 
		isSwitchOn:false
	 }
	 handleTogle=()=>{
		 this.setState({isSwitchOn:!this.state.isSwitchOn})
		 	
	 }
auth = localStorage.getItem("token");
	
	 handleLogout = () => {
		localStorage.removeItem( 'token' );
		localStorage.removeItem( 'useName' );
		window.location.href = '/';
	};
	render() { 
		const userName = ( getUserName() ) ? getUserName() : '';
		let classes;this.state.isSwitchOn ? classes = 's-on' : classes = 's-of';
		return ( 
			<React.Fragment>
				<section className="navbarmain">	
					<div className="navbarinner">
						<ul>
							<li><Link to='/'>Home</Link></li>
							<li><Link to='/signup'>Signup</Link></li>
							
							{ isLoggedIn() ? (
							<React.Fragment>
								<li className="nav-item">
									<NavLink to='/dashboard'>Dashboard</NavLink>
								</li>
								<li className="nav-item">
									<button onClick={() => this.handleLogout() } className="btn btn-secondary ml-3">Logout</button>
								</li>
								<li>{ userName ? <h2>Welcome { userName }!!</h2>: '' }</li>
							</React.Fragment>
						) : (
							<li className="nav-item">
								<NavLink to="/login">Login</NavLink>
							</li>
						) }
						
						</ul>
					</div>
					{ window.location.pathname.includes( 'dashboard' ) ? (
					<div><button id="b-toggle" className={classes}  /*className={this.state.isSwitchOn ? 's-on':'s-of'}*/ onClick={()=>this.handleTogle()}><i className="fa fa-bars"></i></button></div>
				) : ''}
				</section>

			</React.Fragment>
		 );
	}
}
 
export default Navbar;