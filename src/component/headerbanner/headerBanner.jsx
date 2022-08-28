import React, { Component } from 'react';
import './css/custom.css';
import { Link } from 'react-router-dom';
import SectionAbout from '../../pagesection/sectionAbout';
import AdvantageBlock from './../../pagesection/sectionAdvantage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectsContext from '../../context/projectsContext';
import ReviewSlider from './../../pagesection/reviewSlider';
import ContactUs from './../../formcontact/contactus';
class HeaderBanner extends Component {
    state = { 
        pages:[]
     };
     static contextType = ProjectsContext; 
    //  async componentDidMount() {
    //     const { data: pages } = await http.get(config.apiEndpoint + 'wp-json/wp/v2/book')
    //     this.setState({ pages })
    //     console.log('pages data',pages)
    //  }
    componentDidMount() {
       this.context.getAllPageData();
      }
    render() { 
        const {pages} = this.context;  
        return ( 
            <React.Fragment>
                 {pages.map(item =>
                    <div key={item.id} className="section-home">
                        <div className="banner-main d-flex align-items-center flex-column">
                            <div className="container">
                                <div className="container">
                                    <div className="content-banner">
                                        <h2>{item.acf.banner_text}</h2>    
                                        <div className="contact"><Link to="/">{item.acf.banner_link}</Link></div>  
                                    </div>
                                </div>
                                <div className="banner-head">
                                    <img src={item.acf.banner_image}/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-help">
                            <SectionAbout  contentabout={item.acf.section_about} />
                        </div>
                        <div className="s-benefit">
                            <AdvantageBlock contentadv={item.acf.section_advantage}/>
                        </div>
                        <div className="section-client">
                            <div className="container">
                                <ReviewSlider review={item.acf.review_slider}/>
                            </div>
                        </div>
                    </div>    
                )}           
                <div>
                    <ContactUs/>    
                </div> 
            </React.Fragment>
         );
    }
}
 
export default HeaderBanner;
