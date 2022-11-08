import React, { useState, useContext } from "react";
import Joi from "joi-browser";
import Input from '../common/input';
import axios from 'axios';
import { useCart } from "react-use-cart";
import ProjectsContext from '../context/projectsContext';
const Checkout = (props) => {
const currentContext = useContext(ProjectsContext)
//console.log('currentContext eweewwew', currentContext)
const [account, setAccount] = useState({
	first_name: "",
	last_name: "",
	companyName:"",
	country:'',
	state:'',
	city:'',
	address:'',
	phone:'',
	email:'',
});
const {
	items,
	cartTotal,
   
} = useCart();

const mapItems = items.map((item)=>{
	return {
		product_id:item.id,
        quantity: item.quantity,
		total:item.itemTotal.toString()
	}
})


//console.log('items', items)
const [payment_method, setPayment_Method] = useState("bacs")
const [set_paid, setSet_Paid] = useState(true)
const [errors, setErrors] = useState({});


console.log('chitems', items)
const schema = {
	first_name: Joi.string().min(4).max(20).required().label('First Name'),
	last_name: Joi.string().required().label('Last Name'),
	companyName: Joi.string().allow('').max(200).trim(),
	country: Joi.string().min(3).max(100).required().label('Country'),
	state: Joi.string().required().label('State'),
	city: Joi.string().required().label('City'),
	address: Joi.string().required().label('Address'),
	phone: Joi.number().required().label('Phone'),
	email: Joi.string().email().required().label('Email')
	
	
};

const validateForm = (event) => {
	event.preventDefault();
	
	const result = Joi.validate(account,
		schema, { abortEarly: false });
	//console.log(result);
	const { error } = result;
	if (!error) {
		
		const accountData = {
			payment_method:payment_method,
			//status: 'publish'
			line_items:mapItems,
			shipping_lines: [
				{
				  method_id: "flat_rate",
				  method_title: "Flat Rate",
				  total: "10.00"
				}
			  ],
			set_paid:true,
            billing:{
			first_name: account.first_name,
			last_name: account.last_name,
			companyName: account.companyName,
			country: account.country,
			state: account.state,
			city: account.city,
			address: account.address,
			phone: account.phone,
			email: account.email,	
			}
		};
		console.log('accountData', accountData)
		currentContext.getAllOrders(accountData);
	
	} else {
	const errorData = {};
	for (let item of error.details) {
		const name = item.path[0];
		const message = item.message;
		errorData[name] = message;
	}
	//console.log(errors);
	
	setErrors(errorData);
	return errorData;
		
	}
	
};

const handleInputChange = (event) => {
	const { name, value } = event.target;
	let errorData = { ...errors };
	const errorMessage = validateProperty(event);
	if (errorMessage) {
	errorData[name] = errorMessage;
	} else {
	delete errorData[name];
	}
	let customerData = { ...account };
	customerData[name] = value;
	setAccount(customerData);
	setErrors(errorData);
};

const validateProperty = (event) => {
	const { name, value } = event.target;
	const obj = { [name]: value };
	const subSchema = { [name]: schema[name] };
	const result = Joi.validate(obj, subSchema);
	const { error } = result;
	return error ? error.details[0].message : null;
};

return (
	<div className="container">
        <h3>Add Customer</h3>
        <hr />
        <form className="ui form" onSubmit={validateForm}>
			{errors.first_name && (
				<div className="alert alert-danger">
					{errors.first_name}
				</div>
            )}
			{errors.last_name && (
            <div className="alert alert-danger">
                {errors.last_name}
            </div>
            )}
			{errors.companyName && <div className="alert alert-danger">{errors.companyName}</div>} 
			{errors.country && <div className="alert alert-danger">{errors.country}</div>} 
			{errors.state && <div className="alert alert-danger">{errors.state}</div>} 
			{errors.city && <div className="alert alert-danger">{errors.city}</div>} 
			{errors.address && <div className="alert alert-danger">{errors.address}</div>} 
			{errors.phone && <div className="alert alert-danger">{errors.phone}</div>} 
			{errors.email && <div className="alert alert-danger">{errors.email}</div>} 
			
			<div className="form-group">
				<label htmlFor="bacs">Direct Bank Transfer</label>	
				<input 
					type="radio"
					id="bacs"
					name="payment_method"
					value="bacs"
					checked = {payment_method === "bacs"} 
					onChange={e=>setPayment_Method(e.target.value)}
				/> 
			</div>	
			<div className="form-group">
				<label htmlFor="cod">Cash on delivery</label>	
				<input 
					type="radio"
					id="cod"
					name="payment_method"
					value="cod"
					onChange={e=>setPayment_Method(e.target.value)}
				/> 
			</div>	

			
			<input
				type="hidden"
				value={true}
				name="set_paid"
			/>
			
            <div className="form-group">
				<Input
					name="first_name"
					value={account.first_name}
					type="text"
					label="First Name"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>
            <div className="form-group">
				<Input
					name="last_name"
					value={account.last_name}
					type="text"
					label="Last Name"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>
			<div className="form-group">
				<Input
					name="companyName"
					value={account.companyName}
					type="text"
					label="Company Name"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>
			<div className="form-group">
				<Input
					name="country"
					value={account.country}
					type="text"
					label="Country"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>	
			<div className="form-group">
				<Input
					name="state"
					value={account.state}
					type="text"
					label="State"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>			
			<div className="form-group">
				<Input
					name="city"
					value={account.city}
					type="text"
					label="City"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>			
			<div className="form-group">
				<Input
					name="address"
					value={account.address}
					type="text"
					label="Address"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>
			<div className="form-group">
				<Input
					name="phone"
					value={account.phone}
					type="tel"
					label="Phone"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>	
			<div className="form-group">
				<Input
					name="email"
					value={account.email}
					type="email"
					label="Email"
					onChange={handleInputChange}
					//error={errors.firstName}
				/>
            </div>
			<div className="checkput-info">
				<table width="100%" className="table">
					<tbody>
						{items.map(item=>(
							<tr key={item.id}>
								<td>{item.name} &times; {item.quantity}</td>
								<td>{item.price}</td>
								<td>
								
								</td>
							</tr>
						))}
						<tr>
							<th>Total</th>
							<td>{cartTotal}</td>
							<td align="left" valign="top">
							<div className="btn">
									<button
										type="submit"
										className="btn btn-success"
										
									>
										Add customer
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			
            
        </form>
		
	</div>
);
}

export default Checkout;
