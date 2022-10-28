import React, { Component } from 'react';
import {  Button } from "react-bootstrap";
import ProjectsContext from '../../context/projectsContext';
class CreateNewPost extends Component {
    state = { 
        title: '',
        content: '',
        postCreated: false,
        loading: false,
        message: '',
     }
     static contextType = ProjectsContext;
    
    disabledAddPost() {
        const infodisable = { ...this.state };
        if (infodisable.title === "" || infodisable.content === "") {
          return true;
        } else {
          return false;
        }
      }
     handleInputChange = ( event ) => {
        this.setState( { [ event.target.name ]: event.target.value } );
    };
    handleFormSubmit = e => {
        e.preventDefault();
       // const deleteFiles = [...this.state.deleteFiles];
       const formData = {
        title: this.state.title,
        content: this.state.content,
        status: 'publish'
    };
        this.context.addNewPost(formData);
        this.props.history.push("/dashboard");
        
      };

    render() { 
        return ( 
            <React.Fragment>
                <div className="f-account">     
                    <section className="mt-4">
                        <div className="container">
                            <div className="f-account-inner">
                                <h3>Create Post</h3>
                                <form onSubmit={ this.handleFormSubmit }>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input 
                                            className="form-control" 
                                            type="text"
                                            name="title"
                                            placeholder="Post Title"
                                            onChange={ this.handleInputChange }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Content</label>
                                        <textarea 
                                            className="form-control"
                                            placeholder="Project Description"
                                            name="content"
                                            onChange={ this.handleInputChange }
                                        ></textarea>
                                    </div>
                                    <div className="text-right mb-4">
                                        <Button
                                        variant="primary"
                                        size="lg"
                                        type="submit"
                                        //onClick={e => this.addPost(e)}
                                        disabled={this.disabledAddPost()}
                                        >
                                        Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>    
            </React.Fragment>
         );
    }
}
 
export default CreateNewPost;