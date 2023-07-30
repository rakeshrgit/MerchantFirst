import React, { Component } from 'react';
import ProjectsContext from '../context/projectsContext';
import moment from 'moment';
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
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="about-img">
                                {aboutData.acf?<img src={aboutData.acf.image} alt=""/>: null }
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-desc">
                                <h1 className="mb-4">{aboutData.acf?aboutData.acf.about_title:null}</h1>    
                                <div className="mb-2">{moment(aboutData.date).format('Do MMMM YYYY')}</div>
                                <div className="mb-4" dangerouslySetInnerHTML={{__html: aboutData.acf?aboutData.acf.about_text: null }}></div>
                            </div>
                        </div>
                    </div>
                    {/* <div>   {aboutData.content? renderHTML(aboutData.content.rendered) : null }</div> */}
                    {/* <div>{aboutData.content.rendered}</div>  */}
                </div>
            </div>
        );
    }
}
 
export default About;