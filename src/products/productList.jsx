import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './productCard';
const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
          axios.get('https://w3standards.in/wp-json/wc/v3/products?consumer_key=ck_43d49f1cff1c7d1ac7b45463309ad077a7033d20&consumer_secret=cs_6072a4a869a13be7584ea95dbfd5ae47238814b4').then((response) => {
         // console.log(response);
          setProducts(response.data);
        });
      }, []);
   //console.log('products', products)
    if(products.length > 0){
        return ( 
            <Container>
                <Row>
                {products.map((item, i) => (
                        <ProductCard data={item} key={i}/>     
                    ))}
                </Row>    
            </Container>
         );
    }else{
        return <div>Loading</div>
    } 
   
}
 
export default ProductList;
