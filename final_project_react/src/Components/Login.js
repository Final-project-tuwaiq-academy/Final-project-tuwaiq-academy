import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  return (
<div className='login_div'>
<div className="container">

<div className="row">
    <button className="col login_1" onClick={()=>{window.location.replace("/login");}}>
      <p className="text-center text-white mt-3"><b>Login</b></p>
    </button>
    <button className="col Signup_1" onClick={()=>{window.location.replace("/sign_up");}}>
    <p className="text-center text-white mt-3"><b>Sign Up</b></p>
    </button>

  </div>
  </div>
  <div  className='login_div_2'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-white"><b>Email address</b></label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUserName(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white"><b>Password</b></label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>{setPassword(e.target.value)}}/>
    <div id="emailHelp" className="form-text mt-1"><a href='#'>forgot password?</a></div>

  </div>

  <p className='btn_login'><button type="submit" className="btn btn-primary nohover mt-3">Login</button></p>
  </div>
  </div>
  );
}

export default Login;
