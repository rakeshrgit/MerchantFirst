import React, { Component } from 'react';
class AdvantageBlock extends Component {
    state = {  } 
    render() { 
        const{ contentadv } = this.props;
       //console.log('advanage', contentadv)
        return (
            <React.Fragment>
                <h3 className="text-center">Advantage &amp; Benefit</h3>    
                <div className="row">
                    {contentadv.map((item, index)=>(
                        <div className="col-md-3 col-lg-3 col-sm-6 col-xs-12" key={index}>
                            <div className="about_box">
                                <div className="adv-icon"><img src={item.image} alt="Merchant"/></div>
                                <h4>{item.advantage_text}</h4>
                                <div className="adv-desc">{item.advantage_description}</div>
                            </div>      
                        </div>
                    ))}

                </div>
            </React.Fragment>    
        );
    }
}
 
export default AdvantageBlock;