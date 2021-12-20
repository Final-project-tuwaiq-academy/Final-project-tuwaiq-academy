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
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const usernameIsValid = (username) => {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validatePassword(password) {

  var re = /[a-z]\d|\d[a-z]/i;
  return re.test(password) && password.length > 3;

}

const phoneIsValid = (phone) => {
  var regex = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
  return regex.test(phone); 
}


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
    <label htmlFor="exampleInputEmail1" className="form-label text-white">UserName</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUserName(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Email address</label>
    <input type="email" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setEmail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Phone</label>
    <input type="text" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setPhone(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
  <div>
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Re-Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e)=>{setRePassword(e.target.value)}}/>
  </div>

  <p className='btn_login'><button type="button" className="btn btn-primary nohover mt-5" onClick={()=>{
    if(! usernameIsValid(userName)){setError('Username is incorrect'); return;}
    if(! validateEmail(email)){setError('Email is incorrect'); return;}
    if(! phoneIsValid(phone)){setError('Phone is incorrect'); return;}
    if(! validatePassword(password)){setError('Password is incorrect'); return;}
    if(password !== rePassword){setError('There is no match in the password'); return;}


        const user = {
          "user_name":userName,
          "phone":phone,
          "email":email,
          "password":password}

axios.post(`http://localhost:8080/users`, user)
.then(response => {});
setError('')
  window.location = '/login'}}>Sign Up</button></p>
  </div>
  </div>
  );
}

export default Sign_Up;