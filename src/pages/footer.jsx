import React from 'react';
import Flogo from '../images/footer-logo.png'
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return ( 
        <React.Fragment>
            <div className="footer-bg">    
                <div className="container">
                    <div className="f-l text-center mb-4">
                        <img src={Flogo} alt="logo"/>
                    </div>
                    <div className="f-nav">
                        <ul className="d-flex list-unstyled mb-0 w-100 justify-content-center">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/signup">Signup</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>    
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center">
                <div className="container">
                    <div className="copyright-text text-center">
                        Copyright © 2023 IStudy. All Rights Reserved.
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Footer;
