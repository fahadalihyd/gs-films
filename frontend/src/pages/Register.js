import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IS_LOGIN } from '../helper/config';
// import  API_URL  from "../helper/config";
import appRequest from "../hooks/useAxios";



const Register = () => {

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (IS_LOGIN) {
            navigate("/");
        }
    }, [])
    
    
    const registerHandel =  async () => {
        try {
            let response = await appRequest.post("/auth/register" , {email,password,name});
            localStorage.setItem('user' , JSON.stringify(response.data));
            alert("Registered Successfully!");
            window.location.reload();
        } catch (error) {
            console.log(error.response.data.message);
        }    
    }
    
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <h3>Register</h3>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Name</label>
                        <input type={'text'} className={`form-control`} required onChange={(e) => { setName(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type={'email'} className={`form-control`} required onChange={(e) => { setEmail(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type={'password'} className={`form-control`} required onChange={(e) => { setPassword(e.target.value)}} />
                    </div>
                    <div className="form-group text-left">
                        <button className="btn btn-primary mt-3" onClick={registerHandel}>Register</button>
                    </div>
                </div>
                    <Link to="/">Go Back</Link>
            </div>
        </div>
    )
}


export default Register;