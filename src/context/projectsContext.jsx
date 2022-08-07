import React, { Component } from "react";
import { toast } from "react-toastify";

import{
  
    getPosts,
    deletePost,
    updatePost,
    createPost,
    getPostWithImage,
    getPageData
} from "../services/projects";


const Context = React.createContext();
//var stringify = require("json-stringify-safe");

export class ProjectsContext extends Component {
    state = { 
        posts:[],
        pages:[],
        isloading: false,
        pageSize: 2, // for pagination
        currentPage:1
        
     };

     handlePageChange = page => {
      this.setState({ currentPage: page });   
    }; 
    
     getAllPosts = async () => {
        try {
          // await getPosts().then(response => {
          //   if (response.status === 200) {
          //     const posts = response.data;
          //     this.setState({ posts: posts, isloading: true });
          //     console.log('posts ee',posts);
          //   }
           
          // });
          const res = await getPosts();
          
          const res2 = await getPostWithImage(res.data);
          //console.log(res2)
          const data = await Promise.all(res2)
          console.log("data", data)
          this.setState({ posts: data, isloading: true });

        } catch (err) {
          this.setState({ posts: [], isloading: true });
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


      onDeletePost = async (id) => {
        console.log('onDeletePost', id)
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
       // console.log('onUpdatePost', id)
      //  const posts = this.state.posts;

          try {
            await updatePost(item).then(response => {
              if (response.status) {
                const posts = [...this.state.posts];
                const index = posts.indexOf(item);
                posts[index] = {...item};
               // this.setState({posts, isloading: true})
               // console.log('updatePostposts', posts)
                toast.success("Post Updated!");
              } else {
                toast.error("Post not Updated!");
              }
            });
          } catch (err) {}
      };
      addNewPost = async item => {
        try {
          await createPost(JSON.stringify(item)).then(response => {
            console.log("addNewPost: ", response);
            if (response.status) {
              
              toast.success("Post Added!");
              this.getAllPosts();
              // window.location.href = "cdt";
              // const result = response.data;
              // item.id = result.data.projectId;
              // const allProjects = [item, ...this.state.allProjects];
              // this.setState({ allProjects });
            } else {
              toast.error("post Not Added!");
            }
          });
        } catch (err) {}
      };  
    render() { 
      
        return ( 
            <Context.Provider
            
                value={{ 
                    ...this.state,
                    getAllPosts: this.getAllPosts,
                    getAllPageData: this.getAllPageData,
                    onDeletePost: this.onDeletePost,
                    handlePageChange:this.handlePageChange,
                    onUpdatePost:this.onUpdatePost,
                    addNewPost:this.addNewPost,
                    getPostWithImage: this.getPostWithImage 
                }}
                
            >
                
                {this.props.children}

            </Context.Provider>
         );
    }
}

export default Context;
