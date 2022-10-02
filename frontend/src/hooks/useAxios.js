import axios from 'axios';
import  API_URL  from '../helper/config';

const appRequest = axios.create({
  baseURL: API_URL, 
})


appRequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("Request is sending!");
    // alert("RUN");
    return config;
  }, function (error) {
    // Do something with request error
    alert("Request Error!")
    return Promise.reject(error);
});

appRequest.interceptors.response.use(function (config) {
    // Do something before request is sent
    // console.log("Request is sending!");
    // alert("RUN");
    return config;
  }, function (error) {
    // Do something with request error
    // console.log(error);
    alert(error.response.data.message);
    return Promise.reject(error);
});



export default appRequest

