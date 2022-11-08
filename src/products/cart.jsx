import React, {  } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { useCart } from "react-use-cart";

const AddToCart = (props) => {
   
    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    //console.log('items', items)
    // const handleCheckout = () =>{
    //     props.history.push('/checkout-new')
       
    //     //console.log('checkout-new')
    // }
    return ( 
        <Container className="py-4 mt-5">
            <h1>
                {isEmpty? 'Your Cart is Empty' : 'The Cart'}
            </h1>
            <Row className="justify-content-center">
                <Table responsive="sm" striped bordered hover  className="mb-5">
                    <tbody>
                        {items.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                        <div>
                                            <div style={{ padding: '.5rem'}}>
                                                {item.images.map(img => (
                                                        <div key={img.id}><img src={img.src} alt={img.name}/></div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>
                                            {item.name}
                                        </h6>
                                    </td>
                                    <td>Rs. {item.price}</td>
                                    <td>Quantity ({item.quantity})</td>
                                    <td>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
                                        <Button variant="danger" onClick={()=> removeItem(item.id)} className="ms-2">Remove Item</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {!isEmpty &&
                    <Row>
                        <Col className="py-2">
                            <h4>Total Price: Rs. {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="danger"
                                className="m-2"
                                onClick={()=> emptyCart()}
                            >
                                Clear Cart
                            </Button>
                            {/* <Button variant="success"
                                className="m-2"
                                onClick={()=> handleCheckout()}
                            >
                                Checkout
                            </Button> */}
                            <Link to='/checkout-new'>Checkout</Link>
                        </Col>
                    </Row>}
            </Row>
        </Container>
     );
}
 
export default AddToCart;
