import axios from "axios";
const authToken = localStorage.getItem( 'token' );
//console.log('authTokenwww', authToken)
if(authToken) {
  axios.defaults.headers.common['Authorization'] ='Bearer' + authToken;
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  
  if (!expectedError) {
    console.log("UnexpectedError =>", error);
    
  }
  if (expectedError) {
    console.log("UnexpectedError =>",error.response.data.message);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
