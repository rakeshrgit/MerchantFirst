import React, { Component } from 'react';
import ProjectsContext from '../context/projectsContext';
class About extends Component {
    static contextType = ProjectsContext; 
    componentDidMount() {
        this.context.getAboutPageData();
    }
    render() { 
        const { aboutData } = this.context;
        //console.log('about', aboutData)
        return (
            <div className="f-account">
                <div className="container">
                    <h1 className="mb-4">About Us</h1>    
                    <div className="mb-2">{aboutData.date_gmt}</div>
                    <div className="mb-4" dangerouslySetInnerHTML={{__html: aboutData.acf?aboutData.acf.about_text: null }}></div>
                    <div>{aboutData.acf?<img src={aboutData.acf.image} alt=""/>: null }</div>
                    {/* <div>   {aboutData.content? renderHTML(aboutData.content.rendered) : null }</div> */}
                    {/* <div>{aboutData.content.rendered}</div>  */}
                </div>
            </div>
        );
    }
}
 
export default About;