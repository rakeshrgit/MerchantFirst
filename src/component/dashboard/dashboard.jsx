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
import SearchBox from './../../common/searchBox';
import _ from "lodash";
class Dashboard extends Component {
    state = { 

        requiredItem: 0,
        postid: null,
        loading: false,
        error: null,
        show:false,
        //pageSize: 4, // for pagination
        //currentPage:1
        
        
     }
     static contextType = ProjectsContext; 
    
 
     componentDidMount() {
        this.context.getAllCategories();
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
    
    }
     handleShow = (index) =>{
       this.setState({show:true, index})
       console.log('post', index) 
     }
     handleModalClose = () =>{
        this.setState({show:false})
     }
  saveModalDetails =  async item => {
     
        this.setState({show:false})
        await this.context.onUpdatePost(item);  
      }
      handlePageChange = page => {
        this.context.handlePageChange(page);   
       
      };  
       
      
    

      getPagedData = () => {
        const {
          isloading,  
          pageSize,
          currentPage,
          searchQuery,
          posts:allPosts,
          categories
        } = this.context;
    
        let filtered = allPosts;
        if (searchQuery)
          filtered = allPosts.filter(m =>
            m.title.rendered.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        // else if (selectedGenre && selectedGenre._id)
        //   filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    
        const sorted = _.orderBy(filtered);
    
        const posts = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: posts };
      };



    render() { 

        //const{categories} = this.context.categories;
        
    const { length: count } = this.context.posts;
   
    const { pageSize, currentPage,  searchQuery , categories} = this.context;
    //console.log('searchQuery', searchQuery)   
     
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: posts, isloading } = this.getPagedData();

       // console.log('all data', posts)
        console.log('post categories', categories)  
        // const{length:count} = this.context.posts;
        // const {  isloading , pageSize, currentPage, searchQuery, posts:allPosts} = this.context;
        // const posts = paginate(allPosts, currentPage, pageSize)
        const requiredItem = this.state.requiredItem;
        const modalData = posts[requiredItem];
        //console.log('modalData', modalData)
       if (!isloading) {
            if(!posts.length && !searchQuery) return <div>
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
                    <div className="mb-5">
                        <SearchBox value={searchQuery} onChange={this.context.handleSearch}/>    
                    </div>     
                    <div className="d-inner">
                        
                        <p>Showing <strong>{totalCount}</strong> records</p>
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
                                    posts.map((post, index) =>
                                        <tr key={index}>
                                            <td>{post.title.rendered}</td>
                                            <td>{renderHTML(post.content.rendered)}</td>
                                            {/* <td>{item._embedded.author[0].name}</td> */}
                                            <td>
                                                <button className="btn btn-primary btn-xs"
                                                    onClick={()=> {
                                                        this.handleShow(index); 
                                                        this.replaceModalItem(index); 
                                                        
                                                    }}
                                                    >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-danger btn-xs ml-1" onClick={() => this.handleDelete(post.id)}><i className="fa fa-trash"></i></button>
                                            </td>
                                            <td>
                                                
                                                   {post.img ? <img src={post.img} />: 'no image'} 
                                                
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        
                        <Pagination 
                            itemsCount={totalCount}
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
                        title={modalData && modalData.title && modalData.title.rendered}
                        content={modalData && modalData.content && modalData.content.rendered}
                        id={modalData && modalData.id}
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