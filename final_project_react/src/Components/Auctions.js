import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";


function Auctions() {

  const [posts, setPosts] = useState();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [postPrice, setpostPrice] = useState();
  const [user, setUser] = useState();


  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });



  useEffect(() => {
    if(state.user.user_id !== undefined){
      axios.all([
        axios.get(`http://localhost:8080/users/${state.user.user_id}`)
      ])
      .then(r => {
        setUser(r[0].data);
         });
      }

        

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
         });

        
        }  ,[]);

const getPostPrice =(post_id)=>{
for(let i = 0 ; i < price.length ;i++){
  if(post_id === price[i].post.post_id){
    return price[i].price
  }
}
return 0
}

const cheekUser =(post_id)=>{
  for(let i = 0 ; i < price.length ;i++){
    if(post_id === price[i].post.post_id){
      if(price[i].user.user_id === state.user.user_id)
      return 1
    }
  }
  return 0
  }


  
  
  



  return (
<>
{/* ----------------------Search------------------------------- */}
<div className='bg-white py-5'>
<div className=" mt-5 m-lg-5 ">
   <input type="text" className="form-control Text_search" id="inputAddress" placeholder="Search by auction name" onChange={(e)=>{setSearch(e.target.value);}}/>
</div>
<div className=' container_Auctions_Search '>
   <div className="form-group">
      <label htmlFor="inputState" className='Search_label'>City</label>
      <select defaultValue="" id="inputState" className="form-control Text_search" onChange={(e)=>
         {setCity(e.target.value);}}>
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
      <label htmlFor="inputState" className='Search_label'>Mazad Type</label>
      <select defaultValue=""  id="inputState" className="form-control Text_search" onClick={(e)=>
         {setType(e.target.value)}}>
         <option value="" disabled>Choose Mazad Type</option>
         <option value='Cars'>Cars</option>
         <option value='Estate'>Estate</option>
         <option value='Houses'>Houses</option>
      </select>
   </div>
</div>
</div>
{/* ----------------------Search------------------------------- */}
<div className='container container_Auctions'>
   {  posts === undefined ? '' :
   posts.map((element, index) => {
   if(element.title.startsWith(search)  || search === '' && (city === element.city || city === '') && (type === element.post_type || type === '') ){
   return (
   <section className="main-content" key={index}>
      <div className="container">
         <div className="row">
            <div className="cols-sm-6 cols-md-6 cols-lg-6">
               <div className="food-card food-card--vertical">
                  <div className="food-card_img">
                     <img src={element.images} alt="" />
                     <a href={`post/${element.post_id}`}><i className="fa fa-heart"></i></a>
                  </div>
                  <div className="food-card_content">
                     <div className="food-card_title-section">
                        <a href={`post/${element.post_id}`} className="food-card_title">{element.title}</a>
                        <div>
                           <span className="fa fa-map-marker"></span> <b>{element.city}</b>
                        </div>
                     </div>
                     <div className="food-card_bottom-section">
                        <div className="space-between">
                           <div>
                              <span className="fa fa-clock-o"></span> 02:45:21
                           </div>
                           <div className="pull-right">
                              <span className="badge badge-success">Open</span>
                           </div>
                        </div>
                        <hr/>
                        <div className="space-between">
                           <div className="food-card_price mr-5">
                              <span>{getPostPrice(element.post_id)}$</span>
                           </div>
                           <div className="food-card_order-count">
                              <div className="input-group mb-3">
                                 <input type="number" min={getPostPrice(element.post_id)+1} className="form-control input-manulator" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={(e)=>{
                                 setpostPrice(e.target.value);
                                 }} />
                                 <div className="input-group-append">
                                    <button className="btna btn-outline-secondary add-btn" type="button" id="button-addon1" onClick={()=>{
                                    var modal = document.querySelector('.modal');
                                    var span = document.getElementsByClassName("btn-close")[0];
                                    var span2 = document.getElementsByClassName("close_btn")[0];
                                    span.onclick = function() {
                                    modal.style.display = "none";
                                    }
                                    span2.onclick = function() {
                                    modal.style.display = "none";
                                    }
                                    window.onclick = function(event) {
                                    if (event.target == modal) {
                                    modal.style.display = "none";
                                    }
                                    }
                                    if(localStorage.getItem('user') === null){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Login'
                                    document.querySelector('.error_text').innerHTML = 'You must first log in to enter the auction'
                                    return
                                    }
                                    if(postPrice !== undefined && postPrice <= getPostPrice(element.post_id)){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'The entered price is lower than the current price'
                                    return
                                    }
                                    if(postPrice === undefined){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'The entered price is lower than the current price'
                                    return
                                    }
                                    if(user.balance - postPrice < 0){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'Your balance is low'
                                    return
                                    }
                                    if(state.user.user_id === element.user.user_id){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You cannot bid on your post'
                                    return
                                    }
                                    if(cheekUser(element.post_id) === 1){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You are the last bidder on this post'
                                    return
                                    }
                                    axios.all([axios.get(`http://localhost:8080/post_price/${element.post_id}`)
                                    ])
                                    .then( r => {
                                    const userId = r[0].data.user.user_id;
                                    axios.all([
                                    axios.get(`http://localhost:8080/users/${userId}`)
                                    ])
                                    .then(res => {
                                    const userInfo = r[0].data.user;
                                    userInfo.balance = parseInt(userInfo.balance)+ parseInt(getPostPrice(element.post_id));
                                    axios.put(`http://localhost:8080/users/${userInfo.user_id}`,userInfo)
                                    .then(response => {});
                                    });
                                    });
                                    const updatePostPrice = {
                                    "price": postPrice,
                                    "user": user,
                                    }
                                    axios.put(`http://localhost:8080/post_price/${element.post_id}`,updatePostPrice)
                                    .then(response => {});
                                    user.balance =parseInt(user.balance) - parseInt(postPrice);
                                    axios.put(`http://localhost:8080/users/${user.user_id}`,user)
                                    .then(response => {});
                                    setpostPrice(undefined)
                                    window.location.reload(); 
                                    // Get the modal
                                    }}><i className="fa fa-plus"></i></button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   )}
   })}
</div>
<div className="modal" >
   <div className="modal-dialog">
      <div className="modal-content p-0">
         <div className="modal-header p-3">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div className="modal-body text-center p-2 pt-3">
            <p className='error_text'>Modal body text goes here.</p>
         </div>
         <div className="modal-footer p-1">
            <button type="button" className="btn btn-secondary close_btn" data-bs-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>
</>
  );
}

export default Auctions;
