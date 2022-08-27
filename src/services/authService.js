import apiService from "./httpServices";
import { globalConstants } from "../globalvariables";
import axios from 'axios';

const APIBASEURL = globalConstants.BASE_URL;

// export async function login(data) {
//   const loginEndpoint = APIBASEURL + "wp-json/jwt-auth/v1/token";
 
//   const projectsEndpoint = loginEndpoint;
//   return apiService.post(projectsEndpoint, data);
 
// }

// export function logOut(data) {
//   const projectsEndpoint = APIBASEURL + "logout";
//   // return apiService.get(projectsEndpoint, data);
//   return apiService.get(projectsEndpoint, {
//     headers: {
//       Authorization: "Bearer " + data
//     }
//   });
// }

let adminToken = {};
export async function  signUp(data) {
  //console.log('data', data)
  if(adminToken.created){
    let expTime = new Date().getTime() - adminToken.created; 
    let elepseTime = 60*60*1000/2 ;

    if(expTime > elepseTime){
      console.log('tokenExpired, New token is generating')
      const siteURL = 'https://www.w3standards.in/'
      const loginData ={
        username:'admin',
        password:'admin12345678'
      };
      const res = await axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, loginData);
      if(undefined === res.data.token ){
        //this.setState({loading:false})
        //console.log()
        return;
        }
       adminToken = {
          token: res.data.token,
          created: new Date().getTime()
        };
    } 

  }else{
    console.log('dont have any token')
    const siteURL = 'https://www.w3standards.in/'
      const loginData ={
        username:'admin',
        password:'admin12345678'
      };
      const res = await axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, loginData);
      console.log('token', res.data.token)
      if(undefined === res.data.token ){
        //this.setState({loading:false})
        //console.log()
        return;
        }
         adminToken = {
          token: res.data.token,
          created: new Date().getTime()
        };
  } 
  
  
  console.log('adminToken', adminToken)
  const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/users";
  return apiService.post(projectsEndpoint,data,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ adminToken.token }`
       
    }
   
});
}

// export async function forgotPass(data) {
//   const projectsEndpoint = APIBASEURL + "password/create";
//   return apiService.post(projectsEndpoint, data);
// }

// export async function resetPass(tokenKey, data) {
//   const projectsEndpoint = APIBASEURL + "password/change";
//   return apiService.post(projectsEndpoint, data, {
//     headers: {
//       Authorization: "Bearer " + tokenKey
//     }
//   });
// }
// export async function setNewPass(data) {
//   const projectsEndpoint = APIBASEURL + "password/reset";
//   return apiService.post(projectsEndpoint, data);
// }

export default {
  // login
  // loginWithJwt,
  // logout,
  // getCurrentUser,
  // setPassword,
  // forgetPassword,
  // getJwt,
  // getUserID,
  // getCurrentUserEmail
};
