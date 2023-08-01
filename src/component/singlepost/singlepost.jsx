import React, { Component } from 'react';
import ProjectsContext from '../../context/projectsContext';
import renderHTML from 'react-render-html';
import DummypostImg from "../../images/d_post.jpg";
import moment from 'moment';
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
        console.log('spostdd', spost)
        return (
            <div className="f-account-outer">
                <div className="single-post-banner"></div>
                <div className="f-account f-account-single">
                    <div className="container">
                        {spost?
                            <div className="content-inner">
                                <div className="t-excrept">
                                    <h2 className="p-title">{renderHTML(spost.title.rendered)}</h2>
                                    <div className="excrept-details">{renderHTML(spost.excerpt.rendered)}</div>
                                </div>
                                <div className="single-post-img position-relative">
                                    {spost.jetpack_featured_media_url !== "" ?
                                    <div><img src={spost.jetpack_featured_media_url} alt=""/></div>:<div><img src={DummypostImg} alt=""/></div>
                                    }  
                                    <span className="p-date">{moment(spost.date).format('Do MMMM YYYY')}</span> 
                                </div>   
                                <div className="p-desc">    
                                    {renderHTML(spost.content.rendered)}
                                </div>    
                            </div>:'Loading'}
                        
                    </div>
                </div>
            </div>    
        );
    }
}
 
export default SinglePost;