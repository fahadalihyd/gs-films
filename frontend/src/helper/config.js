const API_URL =  "http://localhost:5000";

export const IS_LOGIN = localStorage.getItem("user") ? true : false;
export const _USER =  IS_LOGIN ? null : localStorage.getItem('user'); 

export default  API_URL ;