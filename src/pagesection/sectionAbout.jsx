import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import AboutDescprition from './aboutDescprition'
import { Link } from 'react-router-dom';
class SectionAbout extends Component {
    state = {  }
    render() { 
        const{contentabout} = this.props;
        //console.log('dadaAbout', acf);
        return ( 
            <React.Fragment>
                <div className="container">
                    {
                        contentabout.map(content=>(
                            <div  className="row">
                                <div className="col-md-5">
                                    <div className="img-about">
                                            <img src={content.about_image}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="help-text ">
                                        <h4>{content.about_heading}</h4>
                                        <div>
                                            {content.about_description}
                                        </div>
                                    </div>
                                </div>       
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
         );
    }
}
 
export default SectionAbout;