import React from 'react';
import { Switch, Route } from "react-router-dom";
import HeaderBanner from './component/headerbanner/headerBanner';
import Navbar from './component/navbar/navbar';
import Login from './component/account/login';
import Dashboard from './component/dashboard/dashboard';
import CreatePost from './component/createpost/createpost';
import CreateNewPost from './component/createpost/createNewpost'
import { ProjectsContext } from "./context/projectsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NetworkDetector from "./networkDetector/networkDetector";
import PrivateRoute from './component/navbar/privareroute';
import Signup from './component/account/signup';
import AccountInfo from './component/common/accountInfo';
import Footer from './pages/footer';
import About from './pages/about';
import ProductList from './products/productList';
import AddToCart from './products/cart';
import NavbarFn from './component/navbar/navbarfn';
import ProductDetails from './products/productDetail';
import Checkout from './products/checkoutNew';

function App() {
  return (
    <React.Fragment>
      <ProjectsContext>
          {/* <Navbar/> */}
          <NavbarFn/>
          <Switch>
              <Route path="/login" exact component={Login} />
              {/* <Route path="/dashboard"  component={Dashboard} /> */}
              <Route path="/about" component={About} />
              <Route path="/product" component={ProductList} />
              <Route  path="/product/:id"  component={ProductDetails} />
              <Route path="/cart" component={AddToCart} />
              <PrivateRoute path="/dashboard"  component={Dashboard} />
              <Route path="/create-post"  component={CreatePost} />
              <Route path="/create-new-post"  component={CreateNewPost} />
              <Route path="/signup" component={Signup}/>
              <Route path="/success" component={AccountInfo}/>
              <Route path="/" exact component={HeaderBanner} />
              <Route path='/checkout-new' component={Checkout} />
          </Switch>
          <ToastContainer />
          </ProjectsContext>  
          <footer>
              <Footer/>
          </footer>
    </React.Fragment>
  );
}

export default NetworkDetector(App);
