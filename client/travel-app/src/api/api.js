import axios from 'axios'

const serverURL = 'http://localhost:5000/login'
export const loginPostReq =(data)=>{
return axios.post(serverURL,data);
} 