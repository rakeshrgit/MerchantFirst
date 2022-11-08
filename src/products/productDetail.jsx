import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import axios from 'axios';
//import { useParams } from "react-router-dom";
const ProductDetails = (props) => {
    const { addItem } = useCart();
    //const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get('https://w3standards.in/wp-json/wc/v3/productsconsumer_key=ck_43d49f1cff1c7d1ac7b45463309ad077a7033d20&consumer_secret=cs_6072a4a869a13be7584ea95dbfd5ae47238814b4' ).then((response) => {
       //console.log(response);
       setProduct(response.data);
      });
    }, []);
    
    //console.log('product', product)
    const addToCart = (product) =>{
        //console.log('product', product)
        addItem(product);
    }
    return ( 
        <Container>
             <div>{product.name}</div>   
             <div dangerouslySetInnerHTML={{__html:product.description}}></div>
             <div>
             {product.images.map(img => (
                    <div key={img.id}><img src={img.src} alt={img.name}/></div>
            ))}
             </div>
             <div>Rs{product.price}</div> 
             <Button onClick={()=> addToCart(product)}>
                Add to cart
             </Button> 
        </Container>    
     );
}
 
export default ProductDetails;