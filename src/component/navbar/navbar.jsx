import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from "../../images/logo.png";
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
						<div className="d-flex  w-100 align-items-center justify-content-between">
							<span className="h-logo">	
								<NavLink to='/'><img src={Logo} alt="payment"/></NavLink>	
							</span>
							<ul className="d-flex align-items-center list-unstyled mb-0 nav-main">
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
									<li>{ userName ? <span>Welcome { userName }!!</span>: '' }</li>
								</React.Fragment>
							) : (
								<li className="nav-item">
									<NavLink to="/login">Login</NavLink>
								</li>
							) }
							
							</ul>
						</div>		
					</div>
				</section>
			</React.Fragment>
		 );
	}
}
 
export default Navbar;