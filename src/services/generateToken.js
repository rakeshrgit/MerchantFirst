import axios from 'axios';
export const getAdminToken = async () => {
    let config = {
        url : "https://www.w3standards.in/wp-json/jwt-auth/v1/token",
        method:"post",
        headers : {},
        data:{
            username : "admin",
            password : "#@12345%&66777"
        }
    }

    const res = await axios(config);

    if(res.data?.token){
        return res.data.token ;
    }else{
        return null
    }
}