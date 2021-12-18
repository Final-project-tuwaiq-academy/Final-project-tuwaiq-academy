import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";



function Auctions() {

  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });



  let { id } = useParams();



  useEffect(() => {

const config = {
  headers: { Authorization: `Bearer ${state.token}` }
};
    axios.all([
      axios.get(`http://localhost:8080/posts/${id}`, config)
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
      }
  
  ,[]);






  return (<>
    {post === undefined ? '' :
    <div className="card Post_div">
      <div className="card-body Post_navbar">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text m-0"><small>{post.city}</small></p>
        <p className="card-text m-0"><small>Post Date {post.date}</small></p>
      </div>
      <div className="card-body Post_body">
        <p className="card-text">{post.content}</p>
      </div>
      <img src={post.images} className="card-img-bottom Post_img" alt="..." height="250px"/>
     
     
      <div className="card-body Post_footer">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text m-0"><small>Last price: <b>{post.city}</b></small></p>
        <p className="card-text m-0"><small>By  <b>@{post.date}</b></small></p>
        
        <p className='text-center'>
    <input type="number" className='post_txt'  placeholder="Password"/>
    <input type="button" className='post_btn' value='Submit'/>
        </p>
      </div>
    </div>
    
    }

<div className='comments_div'>

    {comment === undefined ? '' :
    comment.map((element, index) => {
          return ( 
            <div className="container_comment" key={index}>
    <div>
        <div>
            <div className="card card-white posts container_comment">
                <div className="post-heading">
                    <div className="float-left image">
                        <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image" />
                    </div>
                    <div className="float-left meta">
                        <div className="title h5 mt-4">
                            <a href="#" className='m-3'><b>@{element.user.user_name}</b></a>
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
           <form>
  <div className="m-4">
    <label htmlFor="exampleInputEmail1" className="form-label">Write comment</label>
    <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  rows="4" cols="50"></textarea>
  </div>


 <p className='text-center'><button type="submit" className="btn btn-primary">Submit</button></p> 
</form>
           </div>  
</>
  );
}

export default Auctions;
