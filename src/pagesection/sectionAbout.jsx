import React, { Component } from 'react';
class SectionAbout extends Component {
    state = {  }
    render() { 
        const{contentabout} = this.props;
        //console.log('dadaAbout', contentabout);
        return ( 
            <React.Fragment>
                <div className="container">
                    {
                        contentabout.map((content, index)=>(
                            <div  className="row" key={index}>
                                <div className="col-md-5">
                                    <div className="img-about">
                                            <img src={content.about_image}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="help-text ">
                                        <h4>{content.about_heading}</h4>
                                        <div dangerouslySetInnerHTML={{__html: content.about_description }}></div>
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