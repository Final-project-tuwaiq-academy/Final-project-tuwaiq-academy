import '../App.css';
import Logo from '../Img/m.png'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


function Navbar() {

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

          }
      
      ,[]);

  return (
<div>

    <nav className="navbar navbar-expand-lg navbar-dark main_navbar">
        <div className="container-fluid">
            <a href="#" className="navbar-brand">
                <img src={Logo} height="28" alt="CoolBrand"/>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto">
                    <a href="#" className="nav-item nav-link active text-white"><b>Home</b></a>
                    <a href="/auctions" className="nav-item nav-link text-white"><b>Auctions</b></a>
                    <a href="/profile" className="nav-item nav-link text-white"><b>Profile</b></a>

                </div>
                <div className="navbar-nav ms-auto">
                    {user === undefined ?<a href="/login" className="nav-item nav-link text-white"><b>Login</b></a> :<>
                    <a  className="nav-item nav-link text-white"> <b>@{user.user_name}</b></a>
                    <a  className="nav-item nav-link text-white"><b>{user.balance}$</b></a>
                    <a href="/" className="nav-item nav-link text-white" onClick={()=>{localStorage.clear()}}><b>Logout</b></a>
                    </> }
                </div>
            </div>
        </div>
    </nav>
</div>
  );
}

export default Navbar;
