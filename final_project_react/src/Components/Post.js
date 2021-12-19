import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";



function Auctions() {

  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [price, setPrice] = useState('');
  const [postPrice, setpostPrice] = useState();
  const [user, setUser] = useState();
  const [lastPaidUser, setLastPaidUser] = useState();
  const [addComeent, setAddComeent] = useState('');




  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });



  let { id } = useParams();



  useEffect(() => {

    if(state.user.user_id !== undefined){
      axios.all([
        axios.get(`http://localhost:8080/users/${state.user.user_id}`)
      ])
      .then(r => {
        setUser(r[0].data);
         });
      }


const config = {
  headers: { Authorization: `Bearer ${state.token}` }
};
    axios.all([
      axios.get(`http://localhost:8080/posts/${id}`)
    ])
    .then(r => {
      setPost(r[0].data);
       });
  
       axios.all([
        axios.get(`http://localhost:8080/comments/${id}`)
      ])
      .then(r => {
        setComment(r[0].data);
         });
         axios.all([
          axios.get(`http://localhost:8080/post_price/${id}`)
        ])
        .then(r => {
          setPrice(r[0].data);

          axios.all([
            axios.get(`http://localhost:8080/users/${r[0].data.user.user_id}`)
            ])
            .then(res => {

              setLastPaidUser(res[0].data);
        
            });

           });
      

        }
  
  ,[]);

  const cheekUser =(post_id)=>{
    for(let i = 0 ; i < price.length ;i++){
      if(post_id === price[i].post.post_id){
        if(price[i].user.user_id === state.user.user_id)
        return 1
      }
    }
    return 0
    }




  return (<>
    {post === undefined ? '' :
    <>
    <div className="container-fluid">
       <div className="row">
          <div className="col-12 mt-3">
             <div className="card">
                <div className="card-horizontal" >
                   <div className="card-body w-25 h-25">
                      <h4 className="card-title">{post.title}</h4>
                      
                      <p className="card-text m-0">
                         <small>
                      <span className="fa fa-user"></span> <b>@{post.user.user_name}</b>
                      </small></p>

                      <p className="card-text m-0">
                         <small>
                      
                      <span className="fa fa-map-marker"></span> <b>{post.city}</b>
                      </small></p>
                      <p className="card-text m-0">                                
                      
                         <span className="fa fa-clock-o"></span> 02:45:21
                      
                      </p>
                      <hr>
                      </hr>
                      <p>{post.content}</p>
                   </div>
                </div>
                <div className="card-footer card-footer-post">
                   <small className="text-muted">
                   <div className="newsletter-subscribe">
        <div className="container">
            <div className="intro">
                <h2 className="text-center">Subscribe for our Newsletter</h2>
                <p className="text-center card-text m-0">                      
                         
                      
                      <span className="fa fa-user"></span><b>{lastPaidUser === undefined ? '' : lastPaidUser.user_name}  </b>
                      <span className="fa fa-money"></span> <b> {price.price}$</b>

                      </p>
            </div>
            <div className="form-inline" className='text-center'>
                <div className="form-group"><input type="number" min={price.price+1} className="form-control input-manulator" placeholder="Enter your price" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={(e)=>{
                                 setpostPrice(e.target.value);
                                 }} /></div>
                <div className="form-group"><button className="btn btn-outline-success" type="submit" onClick={()=>{
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
                                    if(postPrice !== undefined && postPrice <= price.price){
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
                                    if(state.user.user_id === post.user.user_id){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You cannot bid on your post'
                                    return
                                    }
                                    if(cheekUser(post.post_id) === 1){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You are the last bidder on this post'
                                    return
                                    }
                                    axios.all([axios.get(`http://localhost:8080/post_price/${post.post_id}`)
                                    ])
                                    .then( r => {
                                    const userId = r[0].data.user.user_id;
                                    axios.all([
                                    axios.get(`http://localhost:8080/users/${userId}`)
                                    ])
                                    .then(res => {
                                    const userInfo = r[0].data.user;
                                    userInfo.balance = parseInt(userInfo.balance)+ parseInt(price.price);
                                    axios.put(`http://localhost:8080/users/${userInfo.user_id}`,userInfo)
                                    .then(response => {});
                                    });
                                    });
                                    const updatePostPrice = {
                                    "price": postPrice,
                                    "user": user,
                                    }
                                    axios.put(`http://localhost:8080/post_price/${post.post_id}`,updatePostPrice)
                                    .then(response => {});
                                    user.balance =parseInt(user.balance) - parseInt(postPrice);
                                    axios.put(`http://localhost:8080/users/${user.user_id}`,user)
                                    .then(response => {});
                                    setpostPrice(undefined)
                                    window.location.reload(); 
                                    // Get the modal
                                    }}>Buy</button></div>
            </div>
        </div>
    </div>
    </small>
                </div>
             </div>
          </div>
       </div>
    </div>
    </>
    }
    <div className='comments_div'>
       {comment === undefined ? '' :
       comment.map((element, index) => {
       return ( 
       <div className="container_comment" key={index}>
          <div>
             <div>
                <div className="card card-white  container_comment">
                   <div className="post-heading">
                      <div className="float-left image">
                         <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image" />
                      </div>
                      <div className="float-left meta">
                         <div className="title h5 mt-4 ml-3">
                         <p className="card-text m-0">
                         
                      <span className="fa fa-user"></span> <b>@{element.user.user_name}</b>
                      </p>
                         </div>
                         <h6 className="text-muted time m-3">{element.date}</h6>
                      </div>
                   </div>
                   <div className="post-description m-3">
                      <p>{element.content}</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
       )})}
          <div className="m-4">
             <label htmlFor="exampleInputEmail1" className="form-label">Write comment</label>
             <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  rows="4" cols="50" onChange={(e)=>{
               setAddComeent(e.target.value);
             }}></textarea>
          </div>
          <p className='text-center'><button type="submit" className="btn btn-primary" onClick={()=>{
            const userComeent = {
                      "comment":
                      {
                          "content":addComeent
                      },
                      "post_id":post.post_id,
                      "user_id":state.user.user_id
                  }
                  console.log(post.post_id, " u:",state.user.user_id)
            axios.post(`http://localhost:8080/comments`, userComeent)
            .then(response => {window.location.reload()});
          }}>Submit</button></p>
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
