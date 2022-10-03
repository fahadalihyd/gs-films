import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IS_LOGIN } from '../../helper/config';
import appRequest from '../../hooks/useAxios';


const FilmForm = () => {

    const [name , setName] = useState("");
    const [description , setDescription] = useState("");
    const [release_date , setRelease_date] = useState("");
    const [rating , setRating] = useState("");
    const [ticket_price , setTicket_price] = useState("");
    const [country , setCountry] = useState("");
    // const [genres , setGenres] = useState([]);
    const [photo , setPhoto] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!IS_LOGIN) {
            navigate("/");
        }
    }, [])
    
    function handleChangePhoto(event) {
        setPhoto(event.target.files[0])
      }

    const  createHandel =  async (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name' , name);
        form_data.append('description' , description);
        form_data.append('release_date' , release_date);
        form_data.append('rating' , rating);
        form_data.append('ticket_price' , ticket_price);
        form_data.append('country' , country);
        form_data.append('genres' , ['A' , 'B' , 'C']);
        form_data.append('photo' , photo);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          try {
              let response = appRequest.post('/film/create' , form_data , config);
              alert(response.data.message);
              navigate('/');
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <div className="container">
            <form encType='multipart/form-data' onSubmit={createHandel}>
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <h3>Create A new Film</h3>
                        </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type={'text'} className={`form-control`} required onChange={(e) => { setName(e.target.value)}} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className={`form-control`} required onChange={(e) => { setDescription(e.target.value)}}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Release Date</label>
                                    <input type={'date'} className={`form-control`} required onChange={(e) => { setRelease_date(e.target.value)}} />
                                </div>
                                <div className="form-group">
                                    <label>Ratings</label>
                                    <select className={`form-control`} required onChange={(e) => { setRating(e.target.value)}}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ticket Price</label>
                                    <input type={'number'} className={`form-control`} required onChange={(e) => { setTicket_price(e.target.value)}} />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input type={'text'} className={`form-control`} required onChange={(e) => { setCountry()}} />
                                </div>
                                {/* <div className="form-group">
                                    <label>Genres</label>
                                    <input type={'text'} className={`form-control`} required onChange={(e) => { setGenres()}} />
                                </div> */}
                                
                                <div className="form-group">
                                    <label>Upload Image</label>
                                    <input type={'file'} className={`form-control`} required onChange={handleChangePhoto} />
                                </div>

                                <div className="form-group text-left">
                                    <button className="btn btn-primary mt-3" onClick={createHandel}>Create</button>
                                </div>
                            </div>
                            <Link to="/">Go Back</Link>
                    </div>
            </form>
        </div>
    )
}


export default FilmForm;