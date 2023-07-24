import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import Logo from "../../images/logo.png";
import { isLoggedIn, getUserName } from '../function/function'
//import './scss/navbar.scss'
class Navbar extends Component {
	state = { 
		click:false
	 }
	 handleClick=()=>{
		 this.setState({click:!this.state.click})
	}
auth = localStorage.getItem("token");
	
	 handleLogout = () => {
		localStorage.removeItem( 'token' );
		localStorage.removeItem( 'useName' );
		window.location.href = '/';
	};
	render() { 
		const userName = ( getUserName() ) ? getUserName() : '';
		
		return ( 
			<React.Fragment>
				<section className="navbarmain">	
					<div className="navbarinner">
						<div className="d-flex  w-100 align-items-center justify-content-between">
							<span className="h-logo">	
								<NavLink to='/'><img src={Logo} alt="payment"/></NavLink>	
							</span>
							<ul className= {this.state.click ? "nav-main list-unstyled menu-active" : "nav-main list-unstyled mb-0 "} >
								<li><NavLink to='/' onClick={this.handleClick}>Home</NavLink></li>
								<li><NavLink to='/about' onClick={this.handleClick}>About Us</NavLink></li>
								{ isLoggedIn() ? (
								<React.Fragment>
									
									<li className="nav-item">
										<NavLink to='/dashboard' onClick={this.handleClick}>Dashboard</NavLink>
									</li>
									<li className="nav-item">
										<button onClick={() => this.handleLogout() } className="btn btn-danger ml-md-1">Logout</button>
									</li>
									<li>{ userName ? <span>Welcome { userName }!!</span>: '' }</li>
								</React.Fragment>
							) : (
								<React.Fragment>
								<li><NavLink to='/signup' onClick={this.handleClick}>Sign Up</NavLink></li>
								<li className="nav-item">
									<NavLink to="/login" onClick={this.handleClick}>Login</NavLink>
								</li>
								
								</React.Fragment>
							) }
								
							</ul>
							<div className="nav-icon" onClick={this.handleClick}>
								<i className={this.state.click ? "fa fa-times fa-2x" : "fa fa-bars fa-2x"}></i>
							</div>
						</div>		
					</div>
				</section>
			</React.Fragment>
		 );
	}
}
 
export default Navbar;