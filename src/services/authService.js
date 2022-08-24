import apiService from "./httpServices";
import { globalConstants } from "../globalvariables";

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

export function signUp(data) {
  //console.log('data', data)
  const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cudzNzdGFuZGFyZHMuaW4iLCJpYXQiOjE2NjEyNzExNjYsIm5iZiI6MTY2MTI3MTE2NiwiZXhwIjoxNjYxODc1OTY2LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.O9wXR6EPmkOGF1axMudmAzNALKTCm8behaplsMcDfeg';
  const projectsEndpoint = APIBASEURL + "wp-json/wp/v2/users";
  return apiService.post(projectsEndpoint,data,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ authToken }`
       
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
