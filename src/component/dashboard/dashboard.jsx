import React, { Component } from 'react';
import ModaEdit from '../Modal/editmodal/moaledit'
import ProjectsContext from '../../context/projectsContext';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import './scss/dashboard.css';
import Pagination from '../common/pagination';
import { paginate } from './../../utils/paginate';
import SearchBox from './../../common/searchBox';
import _ from "lodash";
import Categories from './../categories/Categories';
class Dashboard extends Component {
    state = { 
        requiredItem: 0,
        postid: null,
        loading: false,
        error: null,
        show:false,
        categories:[]
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
       //console.log('post', index) 
     }
     handleModalClose = () =>{
        this.setState({show:false})
     }
  saveModalDetails =  async item => {
    //console.log('item333', item)
        this.setState({show:false})
        await this.context.onUpdatePost(item);  
      }
      handlePageChange = page => {
        this.context.handlePageChange(page);   
       
      };  
      
      getPagedData = () => {
        const {
          pageSize,
          currentPage,
          searchQuery,
          selectedCategory,
          posts:allPosts
          
        } = this.context;
    
        let filtered = allPosts;
        if (searchQuery)
          filtered = allPosts.filter(m =>
            m.title.rendered.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        else if (selectedCategory && selectedCategory.id)
          filtered = allPosts.filter(m => m.categories.includes(selectedCategory.id) );
        else{
           
        }    
        const sorted = _.orderBy(filtered);
    
        const posts = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: posts };
      };



    render() { 

        //const{categories} = this.context.categories;
        
    const { length: count } = this.context.posts;
   
    const { pageSize, currentPage,  searchQuery, categories} = this.context;
    //console.log('searchQuery', searchQuery)   
     
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: posts, isloading } = this.getPagedData();

       // console.log('all data', posts)
        
        // const{length:count} = this.context.posts;
        // const {  isloading , pageSize, currentPage, searchQuery, posts:allPosts} = this.context;
        // const posts = paginate(allPosts, currentPage, pageSize)
        const requiredItem = this.state.requiredItem;
        const modalData = posts[requiredItem];
       // console.log('modalData', modalData)
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
                <div className="d-main">
                    <div className="d-left-nav">
                        <Categories
                            categories={categories} 
                            currentCategory={this.context.selectedCategory}
                            onItemSelect={this.context.handleGenreSelect}
                        />
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <section>
                                    <div className="mb-5">
                                        <div className="search-field">    
                                            <SearchBox value={searchQuery} onChange={this.context.handleSearch}/>    
                                        </div>
                                    </div>     
                                    <div className="d-inner">
                                        <p>Showing <strong>{totalCount}</strong> records</p>
                                        <div className="row mb-5">
                                            {
                                                posts.map((post, index) =>
                                                    <div  key={index} className="col-md-6 mb-4 pb-2">
                                                        <div className="bg-blog">
                                                            <div className="p-img"> {post.img ? <img src={post.img} alt="Post" />: 'no image'} </div>
                                                            <h2 className="p-title">{post.title.rendered}</h2>
                                                            <div className="p-content">{renderHTML(post.content.rendered)}</div>
                                                            <div className="p-action">
                                                                <button className="btn btn-primary btn-xs"
                                                                    onClick={()=> {
                                                                        this.handleShow(index); 
                                                                        this.replaceModalItem(index); 
                                                                        
                                                                    }}
                                                                    >
                                                                    <i className="fa fa-pencil"></i>
                                                                </button>
                                                                <button className="btn btn-danger btn-xs ml-1" onClick={() => this.handleDelete(post.id)}><i className="fa fa-trash"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <Pagination 
                                            itemsCount={totalCount}
                                            pageSize={pageSize}
                                            currentPage={currentPage}
                                            onPageChange={this.handlePageChange}    
                                        />
                                        <div className="mt-3 text-right">
                                            { <Link  to='/create-new-post' className="btn btn-md btn-primary mr-3 create-post">Create New Post</Link>}
                                        </div>
                                    </div>
                                </section>
                            </div> 
                        </div>  
                    </div>  
                </div>                                    

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