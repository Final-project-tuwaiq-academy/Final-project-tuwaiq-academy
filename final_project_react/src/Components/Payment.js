import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'




function Payment() {

 
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [user, setUser] = useState();



  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
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
      
        }},[]);

 

  return (
<div className='container_Payment'>

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


  <div>

{user === undefined ? '' :
<div class="mt-50 mb-50 payment-div">
    <div class="card-payment-title mx-auto text-center"> Payment </div>
    <div class="nav-payment">
        <ul class="mx-auto">
            <li class="active-payment"><a href="#">Recharge</a></li>
        </ul>
    </div>
    <form className='form-payment'> 
        
         <span id="card-header">Add your card:</span>
        <div class="row-1">
            <div class="row row-2"> <span id="card-inner">Card holder name</span> </div>
            <div class="row row-2"> <input className='input-payment' type="number" onChange={(e)=>{
              setBalance(e.target.value);
            }} placeholder="Your Name" /> </div>
        </div>
        <div class="row-1">
            <div class="row row-2"> <span id="card-inner">Card holder name</span> </div>
            <div class="row row-2"> <input className='input-payment' type="text" placeholder="Your Name" /> </div>
        </div>
        <div class="row three">
            <div class="col-7">
                <div class="row-1">
                    <div class="row row-2"> <span id="card-inner">Card number</span> </div>
                    <div class="row row-2"> <input className='input-payment' type="text" placeholder="5134-5264-4" /> </div>
                </div>
            </div>
            <div class="col-2"> <input className='input-payment' type="text" placeholder="Exp. date" /> </div>
            <div class="col-2"> <input className='input-payment' type="text" placeholder="CVV" /> </div>
        </div> <button class="btn-primary btn btn-pay" onClick={()=>{

        if(balance < 0){setError('Username is incorrect'); return;}

user.balance =parseInt(user.balance) + parseInt(balance);
axios.put(`http://localhost:8080/users/${user.user_id}`,user)
                                .then(response => {});
                                setError('')
                                window.location.reload();

}}><b>Add card</b></button>
    </form>
</div>
  
}
  </div>

  </div>
  );
}

export default Payment;
