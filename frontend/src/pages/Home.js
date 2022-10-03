import { useEffect, useState } from "react";
import appRequest from "../hooks/useAxios";
import {Link} from 'react-router-dom';
import './style/v1.css';
import API_URL, { IS_LOGIN } from "../helper/config";
import RatingStar from "../components/RatingStar";

const Home = () => {

    const [Items, setItems] = useState({});
        
    useEffect( () => {
        const fetchfilm = async () => {
            let {data} = await appRequest.get('/film');
            setItems(data.data);
            
        }
        fetchfilm().catch((e) => {
            console.log(e);
        })
    } , []); 

    return (
        <div>
            <h1>Films</h1>

            <div className="container">
                {!IS_LOGIN && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Link className="btn btn-primary m-2 " to={`/login`} >Login</Link>
                        <Link className="btn btn-info" to={`/register`}>Register</Link>
                    </div>
                </div>
                )}

                {IS_LOGIN && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Link className="btn btn-primary m-2 " to={`/film/create`} >Add New Film</Link>
                    </div>
                </div>
                )}
                <div className="row">
                    
                    {
                        Items && 
                        Items.length > 0 && 
                        (
                            Items.map((item , i) => {
                                return (
                                    <div className="col-md-4 mt-4">

                                    <div className="card" key={i}>
                                        <img className="card-img-top" src={`${API_URL}/${item.photo}`} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{ item.name }</h5>
                                            <p className="card-text">{ item.description }</p>
                                            <p>
                                                {
                                                    (item.rating && item.rating > 0) && (
                                                        <RatingStar rating={item.rating}></RatingStar>
                                                    )
                                                }
                                            </p>
                                            <a href="#" className="btn btn-primary">View</a>
                                        </div>
                                        </div>
                                    </div>
                                )
                            }) 
                            ||
                            (
                                <>
                                    <h3>No Items Found!</h3>
                                </>
                            )
                        )

                }
                    
                </div>
            </div>
        </div>
    )
}


export default Home;