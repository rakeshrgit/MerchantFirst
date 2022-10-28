import React, { Component } from 'react';
import Slider from "react-slick";
class ReviewSlider extends Component {
    state = {  } 
    render() { 
        const {review} = this.props;
        var settings = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <Slider {...settings}>
                    {
                      review.map((item, index)=>(
                        <div className="text-slide-info text-center" key={index}>
                            <img src={item.image} alt="Slider"/>
                            <p>{item.slider_description}</p>
                            <h6>{item.review_name}</h6>
                        </div>
                      ))  
                    }
                </Slider>    
            </React.Fragment>
        );
    }
}
 
export default ReviewSlider;