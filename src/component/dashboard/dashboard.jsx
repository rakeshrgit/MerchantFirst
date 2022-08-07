import React, { Component } from 'react';
import Sibebar from '../sidebar/sidebar';
//import http from '../../services/httpServices';
//import config from '../../config.json';
import ModaEdit from '../Modal/editmodal/moaledit'
import ProjectsContext from '../../context/projectsContext';
//import axios from 'axios'
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
//import './scss/dashboard.scss';
import Pagination from '../common/pagination';
import { paginate } from './../../utils/paginate';
class Dashboard extends Component {
    state = { 

       requiredItem: 0,
        postid: null,
        loading: false,
        error: null,
        show:false,
     }
     static contextType = ProjectsContext; 
    
 
     componentDidMount() {
        // this.context.getAllProjects();
        let xms = this.context;
        console.log('xms',xms);
       this.context.getAllPosts();
      }
      handleDelete = async id => {
        await this.setState({ postid: id });  
         this.context.onDeletePost(this.state.postid);  
    }; 
   
       replaceModalItem = (index) => {
      this.setState({
        requiredItem: index
      });
      //console.log(index)
    }
     handleShow = () =>{
       // console.log('showdata', item)
         this.setState({show:true})
     }
     handleModalClose = () =>{
        this.setState({show:false})
     }
  saveModalDetails =  async item => {
       // console.log('save item', item)
        this.setState({show:false})
        await this.context.onUpdatePost(item);  
      }
      handlePageChange = page => {
        this.context.handlePageChange(page);   
       //this.setState({currentPage:page});
      };  
       
    render() { 
        const{length:count} = this.context.posts;
        const {  isloading , pageSize, currentPage, posts:allPosts} = this.context;
        // export function getMovies() {
        //     return posts;
        //   }
      
        //const {currentPage} = this.state;
        //const {   error, requiredItem } = this.state;
        //const modalData = posts[requiredItem];
    
       const posts = paginate(allPosts, pageSize, currentPage)
        
       if (isloading) {
            if(posts.length === 0) return <div>
                <p>No Data Found</p>
                <div className="mt-3 text-right">
                            { <Link  to='/create-new-post' className="btn btn-md btn-primary mr-3">Create New Post</Link>}
                        </div>
            </div>;  
        return ( 
          
            <React.Fragment>
                
                <Sibebar/>
                <div>

                </div>
                <section className="d-main">
                    <div className="d-inner">
                        <p>Showing <strong>{posts.length}</strong> records</p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Author</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.title.rendered}</td>
                                            <td>{renderHTML(item.content.rendered)}</td>
                                            {/* <td>{item._embedded.author[0].name}</td> */}
                                            <td>
                                                <button className="btn btn-primary btn-xs"
                                                    onClick={()=> {
                                                        this.handleShow(); 
                                                        this.replaceModalItem(index); 
                                                        
                                                    }}
                                                    >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-danger btn-xs ml-1" onClick={() => this.handleDelete(item.id)}><i className="fa fa-trash"></i></button>
                                            </td>
                                            <td>
                                                <img src={item.img}/>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <Pagination 
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}    
                        />
                        <div className="mt-3 text-right">
                            { <Link  to='/create-new-post' className="btn btn-md btn-primary mr-3">Create New Post</Link>}
                        </div>
                    </div>
            
                </section>
                <ModaEdit  
                        show={this.state.show}
                        close={this.handleModalClose} 
                       // posts={this.state.posts}
                        //title={modalData.title.rendered}
                        //content={modalData.content.rendered}
                        //id={modalData.id}
                        saveModalDetails={this.saveModalDetails}         
                    />          
            </React.Fragment>
            
         );
        }else {
            return <p>Loading Now</p>;
          }

    }
}
 
export default Dashboard;