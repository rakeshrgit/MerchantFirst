import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../account/account.css';
class AccountInfo extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="a-s-info pt-5 pb-5">
                    <div class="success-in">
                        <h1 className="text-center mb-5">Success!</h1>
                        <div className="s-check text-center mb-5">
                            <i className="fa fa-check fa-5x"></i>
                        </div>
                        <h3 className="text-center mb-5">Your account has been created please login now</h3>
                        <div className="a-btn-login text-center">
                            <NavLink to="/login">Login Now</NavLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default AccountInfo;