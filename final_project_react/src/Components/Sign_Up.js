import '../App.css';
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Sign_Up() {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();



  return (
<div className='login_div'>
<div className="container">

<div className="row">
    <button className="col login_2" onClick={()=>{window.location.replace("/login");}}>
      <p className="text-center text-white mt-3"><b>Login</b></p>
    </button>
    <button className="col Signup_2" onClick={()=>{window.location.replace("/sign_up");}}>
    <p className="text-center text-white mt-3"><b>Sign Up</b></p>
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
  }}>Sign Up</button></p>
  </div>
  </div>
  );
}

export default Sign_Up;