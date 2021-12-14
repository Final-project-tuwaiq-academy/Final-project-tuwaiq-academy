import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';

function Auctions() {

  const [posts, setPosts] = useState();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');


  useEffect(() => {
    axios.all([
      axios.get('http://localhost:8080/posts')
    ])
    .then(r => {
      setPosts(r[0].data);
       });
      
       axios.all([
        axios.get(`http://localhost:8080/post_price`)
      ])
      .then(r => {
        setPrice(r[0].data);
         });}
  
  ,[]);

const getPostPrice =(post_id)=>{
for(let i = 0 ; i < price.length ;i++){
  if(post_id === price[i].post.post_id){
    return price[i].price
  }
}
return 0
}

  return (

<>
{/* ----------------------Search------------------------------- */}

<div className=" mt-5 m-lg-5">
    <input type="text" className="form-control Text_search" id="inputAddress" placeholder="Search by auction name" onChange={(e)=>{setSearch(e.target.value)}}/>
  </div>

  <div className=' container_Auctions_Search '>
  <div className="form-group">
  <label htmlFor="inputState">City</label>
      <select defaultValue="" id="inputState" className="form-control Text_search" onChange={(e)=>{setCity(e.target.value)}}>
        <option value="" disabled >Choose Mazad City</option>
        <option value='Al Bukayriyah'>Al Bukayriyah</option>
        <option value='Riyadh'>Riyadh</option>
        <option value='Abha'>Abha</option>
        <option value='Buraydah'>Buraydah</option>
        <option value='Dammam'>Dammam </option>
        <option value='Jeddah'>Jeddah</option>
        <option value='Al Majma’ah'>Al Majma’ah</option>
        <option value='Mecca'>Mecca</option>
        <option value='Medina'>Medina</option> 
        <option value='Qadeimah'>Qadeimah</option> 

      </select>
  </div>
  <div className="form-group ">
      <label htmlFor="inputState">Mazad Type</label>
      <select defaultValue=""  id="inputState" className="form-control Text_search" onClick={(e)=>{setType(e.target.value)}}>
        <option value="" disabled>Choose Mazad Type</option>
        <option value='Cars'>Cars</option>
        <option value='Estate'>Estate</option>
        <option value='Houses'>Houses</option>
      </select>
    </div>
</div>

{/* ----------------------Search------------------------------- */}

<hr className='ml-5 mr-5'/>
<div className='container container_Auctions'>





{  posts === undefined ? '' :
      posts.map((element, index) => {

        if(element.title == search || search === '' && (city === element.city || city === '') && (type === element.post_type || type === '') ){
        
          return (
  <Link to={`/post/${element.post_id}`}  key={index}>
  <div className="card  Auctions_card">
    <div className="row no-gutters">
  
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title"><b>{element.title}</b></h5>
          <p className="card-text"><small className="">Last price: <b>{getPostPrice(element.post_id)} </b></small><br/> <small className=""> Remaining time: <b>{element.city}</b></small></p>
        </div>
      </div>
      <div className="col-md-4">
        <img src={element.images} className="card-img" alt="..." />
      </div>
    </div>
  </div>
  </Link>  
        
          )}
          })}


  </div>
  </>
  );
}

export default Auctions;
