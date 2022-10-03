const API_URL =  "http://localhost:5000";

export const IS_LOGIN = localStorage.getItem("user") ? true : false;
export const _USER =  IS_LOGIN ? null :  JSON.parse(localStorage.getItem('user')); 

export default  API_URL ;