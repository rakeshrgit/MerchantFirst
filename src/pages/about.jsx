import React, { Component } from 'react';
import ProjectsContext from '../context/projectsContext';
import renderHTML from 'react-render-html';
class About extends Component {
    static contextType = ProjectsContext; 
    componentDidMount() {
        this.context.getAboutPageData();
    }
    render() { 
        const { aboutData } = this.context;
        console.log('about', aboutData)
        return (
            <div className="f-account">
                <div className="container">    
                    <div>{aboutData.link}</div>
                    <div>{aboutData.comment_status}</div>
                    <div>{aboutData.date_gmt}</div>
                    {/* <div>{aboutData.content.rendered}</div>  */}
                </div>
            </div>
        );
    }
}
 
export default About;