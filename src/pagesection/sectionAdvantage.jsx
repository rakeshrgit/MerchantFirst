import React, { Component } from 'react';
class AdvantageBlock extends Component {
    state = {  } 
    render() { 
        const{ contentadv } = this.props;
       //console.log('advanage', contentadv)
        return (
            <React.Fragment>
                <div className="container">
                <h3 className="text-center">Advantage &amp; Benefit</h3>    
                    <div className="row">
                        {contentadv.map((item, index)=>(
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-12" key={index}>
                                <div className="about_box">
                                    <p><img src={item.image} alt="Merchant"/></p>
                                    <h4>{item.advantage_text}</h4>
                                </div>      
                            </div>
                        ))}

                    </div>
                </div>
            </React.Fragment>    
        );
    }
}
 
export default AdvantageBlock;