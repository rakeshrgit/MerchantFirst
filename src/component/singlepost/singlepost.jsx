import React, { Component } from 'react';
import ProjectsContext from '../../context/projectsContext';
import renderHTML from 'react-render-html';
import DummypostImg from "../../images/d_post.jpg";
class SinglePost extends Component {
    state = { 
        
     }
    static contextType = ProjectsContext;
    componentDidMount() {
        if (performance.navigation.type === 1) {
            // page was just refreshed:
            window.location.href = '/dashboard';
        } else {
            // rest of your Javascript
        }    
    }
    render() { 
        const{spost} = this.context;
        //console.log('spostdd', spost)
        return (
            <div className="f-account">
                <div className="container">
                    {spost?
                        <div>
                            <div>    
                                {renderHTML(spost.content.rendered)}
                            </div>    
                            <div>
                                {spost.jetpack_featured_media_url !== "" ?
                                <img src={spost.jetpack_featured_media_url} alt=""/>:<img src={DummypostImg} alt=""/>
                                }   
                            </div>    
                        </div>:'Loading'}
                    
                </div>
            </div>
        );
    }
}
 
export default SinglePost;