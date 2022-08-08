import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

//import './scss/edit.scss'
class ModaEdit extends Component {
    state = { 
        title: '',
        content:'',
        id:0
     }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            content: nextProps.content,
            id: nextProps.id,
           
           
        });
        //console.log('Itemsewweewewe',nextProps)
    }
    titleHandler(e) {
        this.setState({ title: e.target.value,  });
    }
    contentHandler(e) {
        this.setState({ content: e.target.value,  });
    }
    handleSave = () => {
        const item = {
            title: this.state.title,
            content: this.state.content,
            id: this.state.id,
           // numberInStock: nextProps.numberInStock,
           // dailyRentalRate: nextProps.dailyRentalRate,
        }
        this.props.saveModalDetails(item)
        //console.log('item Name', item)
    }
    render() { 
       
       const {close} = this.props
      
        return ( 
            <React.Fragment>
                <Modal
                    show ={this.props.show}
                    onHide={close}
                >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit List Data  
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-section">
                                <div className="form-data"><span className="modal-lable">Title:</span> <input value={this.state.title} onChange={(e) => this.titleHandler(e)}/></div>
                                <div className="form-data"><span className="modal-lable">Content:</span><textarea value={this.state.content} onChange={(e) => this.contentHandler(e)}></textarea></div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={close}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { this.handleSave() }}>
                            Save Changes
                        </Button>
                        </Modal.Footer>    
                </Modal>
            </React.Fragment>
         );
    }
}
 
export default ModaEdit;