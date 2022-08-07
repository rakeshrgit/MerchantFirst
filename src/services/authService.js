import apiService from "./httpServices";
import { globalConstants } from "../globalvariables";

const APIBASEURL = globalConstants.BASE_URL;

export async function login(data) {
  const loginEndpoint = APIBASEURL + "wp-json/jwt-auth/v1/token";
 
  const projectsEndpoint = loginEndpoint;
  return apiService.post(projectsEndpoint, data);
 
}

// export function logOut(data) {
//   const projectsEndpoint = APIBASEURL + "logout";
//   // return apiService.get(projectsEndpoint, data);
//   return apiService.get(projectsEndpoint, {
//     headers: {
//       Authorization: "Bearer " + data
//     }
//   });
// }

// export function signUp(data) {
//   const projectsEndpoint = APIBASEURL + "signup";
//   return apiService.post(projectsEndpoint, data);
// }

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
