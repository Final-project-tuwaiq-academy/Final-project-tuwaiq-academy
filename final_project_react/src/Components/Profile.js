import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'




function Profile() {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  return (
<div className='container_Profile'>

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
                    <a href="#">My posts</a>
                </li>
                <li>
                    <a href="#">Bargains </a>
                </li>
            </ul>

        </nav>

 


  </div>


  <div>


<div className='Edit_Acount_div'>
<div className="container">

<div className="row">
    <button className="col Edit_profile_2" onClick={()=>{window.location.replace("/login");}}>
      <p className="text-center text-white mt-3"><b>Acount information</b></p>
    </button>


  </div>
  </div>
  <div  className='login_div_2'>
  <p className='error_login'>{error}</p>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-white"><b>UserName</b></label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUserName(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white"><b>Email address</b></label>
    <input type="email" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setEmail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white"><b>Phone</b></label>
    <input type="text" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setPhone(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white"><b>Password</b></label>
    <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>

  <p className='btn_login'><button type="button" className="btn btn-primary nohover mt-5" onClick={()=>{
    if(userName === ''){setError('Username is incorrect'); return;}
    if(email === ''){setError('Email is incorrect'); return;}
    if(phone === ''){setError('Phone is incorrect'); return;}
    if(password === ''){setError('password is incorrect'); return;}

        const user = {
          "user_name":userName,
          "phone":phone,
          "email":email,
          "password":password}

axios.post(`http://localhost:8080/users`, user)
.then(response => {});
setError('')
  }}>Save changes</button></p>
  </div>
  </div>
  

  </div>

  </div>
  );
}

export default Profile;
