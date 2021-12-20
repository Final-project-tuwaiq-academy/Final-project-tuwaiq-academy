import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";


function UserPosts() {

  const [posts, setPosts] = useState();
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

const cheekUser =()=>{
  for(let i = 0 ; i < posts.length ;i++){
    if(posts[i].user.user_id === state.user.user_id){
      return 1
    }
  }
  return 0
  }
  
  return (
<>
<div className='container_User_Post'>

<div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>User Profile</h3>
            </div>

            <ul className="list-unstyled components">

                <li>
                    <a href="/profile">Acount information</a>
                </li>
                
                <li>

                </li>
                <li>
                    <a href="/user_post">My posts</a>
                </li>
                <li>
                    <a href="#">Bargains </a>
                </li>
                <li>
                    <a href="/payment">Payment</a>
                </li>
            </ul>

        </nav>

 


  </div>



{  posts === undefined ? '' :
      cheekUser() === 0 ?
      <header class="bg-dark py-5 ">
    <div class="container px-5">
        <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
                <div class="text-center my-5">
                    <h1 class="display-5 fw-bolder text-white mb-2">You don't have any posts</h1>
                    <div class="d-grid gap-3 d-sm-flex justify-content-sm-center mt-5">
                        <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started with new post</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header> :

<div className='container container_Auctions'>
   
    { posts === undefined ? '' :
   posts.map((element, index) => {
      if(element.user.user_id === state.user.user_id){
   return (
   <section className="main-content" key={index}>
      <div className="container">
         <div className="row">
            <div className="cols-sm-6 cols-md-6 cols-lg-6">
               <div className="food-card food-card--vertical-User-Post">
                 
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
                        <div className="food-card_price mr-5 text-center">
                              <span className=''>{getPostPrice(element.post_id)}$</span>
                           </div>
                        <hr/>
                        <div className="">
                        <button type="button" class="btn btn-outline-primary btn-User-Post" onClick={()=>{

                        }}>Edit Post</button>
                        <button type="button" class="btn btn-outline-danger btn-User-Post mt-2" onClick={()=>{
                               axios.delete(`http://localhost:8080/posts/${element.post_id}`)
                              .then(() => {});
                              window.location.reload();
                        }}>Delete Post</button>

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



}
</div></>);}  

export default UserPosts;
