import React, { Component } from "react";
import { toast } from "react-toastify";

import{
  
    getPosts,
    getCategories,
    deletePost,
    updatePost,
    createPost,
    getPostWithImage,
    getPageData,
    getAboutData,
    getsingle
} from "../services/projects";
const Context = React.createContext();
//var stringify = require("json-stringify-safe");

export class ProjectsContext extends Component {
    state = { 
        posts:[],
        pages:[],
        aboutData:[],
        spost:null,
        categories:[],
        isloading: false,
        pageSize: 4, // for pagination
        currentPage:1,
        requiredItem: 0,
        searchQuery:""
     };
  
     handlePageChange = page => {
      this.setState({ currentPage: page });   
    }; 
    
    handleSearch = query => {
      this.setState({ searchQuery: query, currentPage: 1 });
    };

    handleGenreSelect = (category) =>{
      this.setState({ selectedCategory:category, currentPage: 1 })
   }

     getAllPosts = async () => {
        try {
          const res = await getPosts();
          const res2 = await getPostWithImage(res.data);
          const data = await Promise.all(res2)
          this.setState({ posts: data, isloading: true });

        } catch (err) {
          this.setState({ posts: [], isloading: true });
        }
      }; 

      getAllCategories = async () => {
        try {
          await getCategories().then(response => {
            if (response.status === 200) {
              const categories = [{ id: "", name: "All Posts" }, ...response.data];
             
              this.setState({ categories, isloading: true });
              
              //console.log('page data category',categories);
            }
           
          });
          

        } catch (err) {
          this.setState({ categories: [], isloading: true });
        }
      }; 


      getAllPageData = async () => {
        try {
          await getPageData().then(response => {
            if (response.status === 200) {
              const pages = response.data;
              this.setState({ pages, isloading: true });
              //console.log('page data context',pages);
            }
          });
        } catch (err) {
          this.setState({ pages: [], isloading: true });
        }
      }; 

      getAboutPageData = async () => {
        try {
          await getAboutData(JSON.stringify()).then(response => {
            if (response.status === 200) {
              const aboutData = response.data;
              this.setState({ aboutData });
             // console.log('about page data', aboutData);
            }
          });
        } catch (err) {
          this.setState({ aboutData: [], isloading: true });
        }
      }; 

      onDeletePost = async (id) => {
        //console.log('onDeletePost', id)
        const posts = this.state.posts;
          
          try {
            await deletePost(id).then(response => {
              if (response.status) {
                let post = posts.filter(item => item.id !== id);
                this.setState({ posts: post });
                toast.success("Post Deleted!");
              } else {
                toast.error("Post not Deleted!");
              }
            });
          } catch (err) {}
      };
      onUpdatePost = async (item) => {
       //console.log('item', item)
      //  const posts = this.state.posts;
         // console.log('item', item)
         this.setState({isloading: true }); 
         try {
            await updatePost(item).then(response => {
              if (response.status) {
                this.setState({isloading: false }); 
                this.getAllPosts();
                toast.success("Post Updated!");
              } else {
                this.setState({isloading: false }); 
                toast.error("Post not Updated!");
              }
            });
          } catch (err) {this.setState({isloading: false }); }
      };
      addNewPost = async item => {
        try {
          await createPost(JSON.stringify(item)).then(response => {
           // console.log("addNewPost: ", response);
            if (response.status) {
              
              toast.success("Post Added!");
              this.getAllPosts();
             
            } else {
              toast.error("post Not Added!");
            }
          });
        } catch (err) {
          //console.log('add new post error', err.response);
          const {status} = err.response || {} ;
          if(status === 403){
            toast.error("you are not allowed to add post");
          }else if(status >= 500){
            toast.error("Internal Server Error");
          }else{
            toast.error("Something went error");
          }
        }
      };  
      getSinglePost = async (id) => {
        try {
            await getsingle(id).then(response => {
              //console.log('response.status', response.status)
              if (response.status === 200) {
                const singlepost = response.data;
                this.setState({ spost: singlepost });
                //console.log('posts ee',singlepost);
              }
              else {

              }
            });
          } catch (err) {
            
          }


        }; 
    render() { 
        return ( 
            <Context.Provider
            
                value={{ 
                    ...this.state,
                    getAllPosts: this.getAllPosts,
                    getAllCategories: this.getAllCategories,
                    getAllPageData: this.getAllPageData,
                    onDeletePost: this.onDeletePost,
                    handlePageChange:this.handlePageChange,
                    onUpdatePost:this.onUpdatePost,
                    addNewPost:this.addNewPost,
                    getPostWithImage: this.getPostWithImage ,
                    handleSearch: this.handleSearch,
                    handleGenreSelect: this.handleGenreSelect,
                    getAboutPageData: this.getAboutPageData,
                    getSinglePost: this.getSinglePost
                }}
                
            >
                
                {this.props.children}

            </Context.Provider>
         );
    }
}

export default Context;
