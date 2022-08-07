import React, { Component } from 'react';
import axios from 'axios';
import http from '../../services/httpServices';
import config from '../../config.json';
import Loader from "../../images/loader.gif";
class CreatePost extends Component {
    state = { 
        title: '',
        content: '',
        postCreated: false,
        loading: false,
        message: '',
    }
    createMarkup = ( data ) => ({
		__html: data
    });
    handleFormSubmit =  ( event ) => {
		event.preventDefault();
        this.setState( { loading: true } );
        const formData = {
			title: this.state.title,
			content: this.state.content,
			status: 'publish'
		};
        //const wordPressSiteUrl = clientConfig.siteUrl;
		const authToken = localStorage.getItem( 'token' );
		
        // Post request to create a post
        axios.post(config.apiEndpoint + 'wp-json/wp/v2/posts?_embed', formData, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ authToken }`
			}
		} )
			.then( res => {

				this.setState( {
					loading: false,
					postCreated: !! res.data.id,
					message: res.data.id ? 'New post created' : ''
					
				} )
			} )
			.catch( err => {{

				this.setState( { loading: false, message: err.response.data.message } )
			}} )
			
		};
    handleInputChange = ( event ) => {

		this.setState( { [ event.target.name ]: event.target.value } );

	};
	fileSelectHandler = (e) =>{
		this.setState({
			feature_image: e.target.files[0]
		
		})
	} 
    render() { 
        const { loading, message, postCreated } = this.state;
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="mt-3">
                    <form onSubmit={ this.handleFormSubmit } className="mt-5" style={{ maxWidth: '800px' }}>
					<legend className="mb-4">Create Post</legend>

					{ message ? <div className={ `alert ${ postCreated ? 'alert-success': 'alert-danger' }` } dangerouslySetInnerHTML={ this.createMarkup( message ) }/> : ''}

					{/*Title*/}
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" onChange={ this.handleInputChange } className="form-control" id="title"/>
					</div>

					{/*	Content*/}
					<div className="form-group">
						<label htmlFor="my-post-content">Content</label>
						<textarea name="content" className="form-control" id="my-post-content" onChange={ this.handleInputChange } rows="10"/>
					</div>
					


					{/*	Submit button*/}
                    <button 
                    
                        type="submit" 
                        className="btn btn-success">Submit</button>
					{ loading && <img className="loader" src={ Loader } alt="Loader"/> }
				</form>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default CreatePost;