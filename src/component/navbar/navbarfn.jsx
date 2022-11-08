import React from 'react';
import { Button, Container } from "react-bootstrap";
import Logo from "../../images/logo.png";
import { Outlet, Link, NavLink  } from "react-router-dom";
import { useCart } from "react-use-cart";
import { isLoggedIn, getUserName } from '../function/function'

const NavbarFn = () => {
    const {
        isEmpty,
        totalItems,
    } = useCart(); 
    const handleLogout = () => {
		localStorage.removeItem( 'token' );
		localStorage.removeItem( 'useName' );
		window.location.href = '/';
	};  
    const userName = ( getUserName() ) ? getUserName() : '';
    return ( 
        <React.Fragment>
            <section className="navbarmain">
                <div className="navbarinner">
                    <div className="d-flex  w-100 align-items-center justify-content-between">
                        <span className="h-logo">	
                            <NavLink to='/'><img src={Logo} alt="payment"/></NavLink>	
                        </span>
                        <ul className="d-flex align-items-center list-unstyled mb-0 nav-main">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/about'>About Us</NavLink></li>
                            <li><NavLink to='/product'>Products</NavLink></li>
                            <li className="me-2">
                                <NavLink to="/cart">
                                {!isEmpty && <span style={{ position: 'relative', left: '0', top: '0'}}>{totalItems}</span>}
                                <span style={{ marginLeft: !isEmpty ? '0': 0}}>Cart</span>
                                </NavLink>
                            </li>
                            { isLoggedIn() ? (
                            <React.Fragment>
                                
                                <li className="nav-item">
                                    <NavLink to='/dashboard'>Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => handleLogout() } className="btn btn-danger ml-3">Logout</button>
                                </li>
                                <li>{ userName ? <span>Welcome { userName }!!</span>: '' }</li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <li><NavLink to='/signup'>Signup</NavLink></li>
                            <li className="nav-item">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            </React.Fragment>
                        ) }
                        
                        </ul>
                    </div>		
                </div>
            </section>
        </React.Fragment>    
     );
}
 
export default NavbarFn;
