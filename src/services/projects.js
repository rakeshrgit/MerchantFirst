import apiService from './httpServices'
import { globalConstants } from "../globalvariables";
//import function from './../networkDetector/networkDetector';
const APIBASEURL = globalConstants.BASE_URL;

export function getPageData() {
  const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/book";
  return apiService.get(projectsEndpoint);
}

export function getPosts() {
    const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/posts/?per_page=100";
    return apiService.get(projectsEndpoint);
}

export function getCategories() {
  const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/categories";
  return apiService.get(projectsEndpoint);
}


export async function  getPostWithImage(posts){
    return posts.map(async (post, index) => {
      if(post.featured_media !== 0){
      const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/media/" + post.featured_media;
     let {data} = await apiService.get(projectsEndpoint);
     //console.log("d",data)
      posts[index].img = data.guid.rendered; 
      }
    
    return posts[index];
    }
  )
}


 
  export function deletePost(id) {
    const authToken = localStorage.getItem( 'token' );
    const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/posts/" + id;
    return apiService.post(projectsEndpoint,id,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ authToken }`
         
      }
     
  });
  }


  export function updatePost(item) {
     const authToken = localStorage.getItem( 'token' );
    const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/posts/" + item.id;
    return apiService.post(projectsEndpoint,item,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ authToken }`
         
      }
     
  });
  }

 export function createPost(data) {
    //console.log('data', data)
    const authToken = localStorage.getItem( 'token' );
    //console.log('authToken', authToken)
    const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/posts?_embed";
    //console.log('projectsEndpoint', projectsEndpoint)
    return apiService.post(projectsEndpoint,data,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ authToken }`
         
      }
     
  });
  }