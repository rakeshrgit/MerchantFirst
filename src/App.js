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
import SinglePost from './component/singlepost/singlepost';

function App() {
  return (
    <React.Fragment>
      <ProjectsContext>
          <Navbar/>
          <Switch>
              <Route path="/login" exact component={Login} />
              {/* <Route path="/dashboard"  component={Dashboard} /> */}
              <Route path="/about" component={About} />
              <PrivateRoute path="/dashboard"  component={Dashboard} />
              <Route path="/create-post"  component={CreatePost} />
              <Route path="/create-new-post"  component={CreateNewPost} />
              <Route path="/signup" component={Signup}/>
              <Route path="/success" component={AccountInfo}/>
              <Route path="/single-post/:id" component={SinglePost}/>
             <Route path="/" exact component={HeaderBanner} />
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
