import { useEffect, useState } from "react";
import appRequest from "../hooks/useAxios";
import {Link} from 'react-router-dom';
import  Highlighted  from "../components/Highlighted";
import './style/v1.css';
import API_URL, { IS_LOGIN } from "../helper/config";

const Home = () => {

    const [Items, setItems] = useState({});
    
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");
    const [ItemId, setItemId] = useState("");
    const [edit, setEdit] = useState(false);
    const [search, setSearch] = useState("");

    
    
    useEffect( () => {
        const fetchfilm = async () => {
            let {data} = await appRequest.get('/film');
            setItems(data.data);
            
        }
        fetchfilm().catch((e) => {
            console.log(e);
        })
    } , []); 

    function editItem(Item) {
         setEdit(true);
        setTitle(Item.title);
        setDescription(Item.description);
        setItemId(Item._id);
    }

    async function  handelSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', Image);
        formData.append('fileName', Image.name);
        formData.append('title' , Title);
        formData.append('description' , Description);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        let res  = await appRequest.post('/film/create' , formData, config);
        console.log(res.data);
        Items.push(res.data);
        setTitle(null)
        setDescription(null)
        setImage(null)
    }

    async function  handelUpdate(e) {
        e.preventDefault()
        const formData = new FormData();
        if (Image) {
            formData.append('image', Image);
            formData.append('fileName', Image.name);
        }
        formData.append('title' , Title);
        formData.append('description' , Description);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        let res  = await appRequest.patch(`/film/${ItemId}` , formData, config);
        console.log(res.data);
        // let fRes = await fetchfilm();
        // setItems(fRes.data);
        setTitle("")
        setDescription("")
        setImage(null)
        setEdit(false);
    }

    function createTrue() {
        setTitle("")
        setDescription("")
        setImage(null)
        setItemId(null);
        setEdit(false);
    }

    const filterBySearch = async (searchQuery) => {
        let params = {
            search:searchQuery
        }
        let res = await appRequest.get('/film' , {params});
        setItems(res.data);   
    }
    
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

                {!IS_LOGIN && (
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
                            Items.map((item) => {
                                return (
                                    <div className="col-md-4 mt-4">

                                    <div className="card" key={item._id}>
                                        <img className="card-img-top" src={`${API_URL}/${item.photo}`} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{ item.name }</h5>
                                            <p className="card-text">{ item.description }</p>
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