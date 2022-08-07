import React, { Component } from 'react';

const Input = ({name, label, value, error, onChange}) => {
    return (
        <React.Fragment> 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value}
                onChange={onChange}
                autoFocus
                id={name} 
                type={name} 
                name={name}
                className="form-control"
            />    
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
        
        </React.Fragment>
     );
}
 
export default Input;