import React, { Component } from 'react';
import $ from "jquery";
import PageMenu from './menus/pageMenu'
//import './scss/sidebar.scss'
class Sibebar extends Component {
    state = { 

     }
     componentDidMount (){
    
        
		$('#b-toggle').on('click', function(){
            //alert('jjj')
			$('.d-main').toggleClass('slide-left')
			$('#sidebar').toggleClass('active'); 
		 }); 	

	 }
    render() { 
        return ( 
            <React.Fragment>
                <section id="sidebar">
                    <div className="sidebar-header">React App</div>
                    <PageMenu/>
                </section>
            </React.Fragment>
         );
    }
}
 
export default Sibebar;

