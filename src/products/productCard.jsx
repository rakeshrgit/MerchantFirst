import React, {useState} from 'react';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
import { useCart } from "react-use-cart";

import { NavLink, withRouter  } from "react-router-dom";
const ProductCard = (props) => {
    
    let { images, name, regular_price, sale_price} = props.data;
    const { addItem } = useCart();
    const[show, setShow] = useState(false);
    const addToCart = () =>{
        addItem(props.data);
        setShow(true)
        //console.log('addItem', addItem)
    }
    const handleDetail = (id) =>{
        //console.log('ddd', id)
        
        props.history.push(`/product/${id}`)
    }
    
    return ( 
            <Col xs={10} md={7} lg={6} xl={4}>
                <Card>
                    <Card.Body>
                        <div>
                        {images.map(img => (
                                <div key={img.id}><img src={img.src} alt={img.name}/></div>
                        ))}
                        </div>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <Card.Title style={{textDecoration:"line-through"}}>
                            {sale_price ? sale_price : null} 
                        </Card.Title>
                        <Card.Title>
                            {regular_price}
                        </Card.Title>
                        
                    </Card.Body> 
                    <Button onClick={()=> addToCart()}>
                        Add to cart
                    </Button> 
                    {show &&  <NavLink to="/cart">View Cart</NavLink>}
                    <Button variant="success" className="mt-2" onClick={()=> handleDetail(props.data.id)}>
                       View Details
                    </Button>    
                </Card> 
            </Col>                
    );
}
 
export default withRouter(ProductCard);
