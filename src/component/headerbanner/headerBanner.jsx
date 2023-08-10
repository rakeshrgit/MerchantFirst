import React, { Component, createRef } from 'react';
import './css/custom.css';
import SectionAbout from '../../pagesection/sectionAbout';
import AdvantageBlock from './../../pagesection/sectionAdvantage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectsContext from '../../context/projectsContext';
import ReviewSlider from './../../pagesection/reviewSlider';
import ContactUs from './../../formcontact/contactus';
import Loader from "../../images/loader.gif";


class HeaderBanner extends Component {
    state = { 
        pages:[]
     };
     constructor(props) {
        super(props);
        this.scrollDiv = createRef();
      }
     static contextType = ProjectsContext; 
    //  async componentDidMount() {
    //     const { data: pages } = await http.get(config.apiEndpoint + 'wp-json/wp/v2/book')
    //     this.setState({ pages })
    //     console.log('pages data',pages)
    //  }
    componentDidMount() {
       this.context.getAllPageData();
    }
    handleScroll = () =>{
        this.scrollDiv.current.scrollIntoView({inline: 'center', behavior: 'smooth' });
    }
    
    render() { 
        const {pages} = this.context;  
        //console.log('pages', pages)
        if(pages.length > 0){
            return ( 
                <React.Fragment>
                    {pages.map(item =>
                        <div key={item.id} className="section-home">
                            <div className="banner-main">
                                <div className="container-splash">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="content-banner">
                                                <h2>{item.acf.banner_text}</h2>    
                                                <div className="contact"><button 
                                                    onClick={this.handleScroll}>{item.acf.banner_link}</button></div>  
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="banner-head">
                                                <img src={item.acf.banner_image} alt="Merchant"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="s-benefit">
                                <AdvantageBlock contentadv={item.acf.section_advantage}/>
                            </div>
                            <div className="bg-help">
                                <SectionAbout  contentabout={item.acf.section_about} />
                            </div>
                            <div className="section-client">
                                <div className="container">
                                    <ReviewSlider review={item.acf.review_slider}/>
                                </div>
                            </div>
                            
                        </div>    
                    )}           
                    <div className="f-contact" ref={this.scrollDiv}>
                        <ContactUs/>    
                    </div> 
                </React.Fragment>
             );
        }
        else{
            return (<div className="l-img-slide">
                <img className="loader" src={Loader} alt="Loader"/>
            </div>)
        }
        
    }
}
 
export default HeaderBanner;
