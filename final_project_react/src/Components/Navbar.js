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
                    <a href="/" className="nav-item nav-link active text-white"><b>Home</b></a>
                    <a href="/auctions" className="nav-item nav-link text-white"><b>Auctions</b></a>
                    {user === undefined ? '' :<>
                    <a  className="nav-item nav-link text-white" href='/payment'><b>{user.balance}$</b></a>
                    </>}
                </div>
                <div className="navbar-nav ms-auto">
                    {user === undefined ?<a href="/login" className="nav-item nav-link text-white"><b>Login</b></a> :<>
                    
                    <li className="nav-item">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">              <img src={user.img} className="rounded-circle" height="22"
              alt="" loading="lazy" /></a>
  <ul className="dropdown-menu li-nav">
    <li><a href="/profile" className="dropdown-item text-center">Profile</a></li>
    <li><hr className="dropdown-divider" /></li>
    <li><a href="/" className="dropdown-item text-center" onClick={()=>{localStorage.clear()}}><b>Logout</b></a></li>
  </ul>
      </li>

                    
                    </> }
                </div>
            </div>
        </div>
    </nav>
</div>
  );
}

export default Navbar;
