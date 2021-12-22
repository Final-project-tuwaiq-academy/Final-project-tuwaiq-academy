import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";


function AddPost() {

  const [title, settitle] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState('');
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState('');
  const [user, setUser] = useState('');


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
      }

        },[]);


  return (<>


<div class="container-addPost">
	<div>
	    
	    <div class="col-md-8 col-md-offset-2">
	        
    		<h1>Create post</h1>
    		
    		    
    		    <div class="form-group has-error">
    		        <label for="slug">Title<span class="require">*</span></label>
    		        <input type="text" class="form-control" name="slug" onChange={(e)=>{
                  settitle(e.target.value);
                }}/>
    		    </div>
    		    
    		    <div class="form-group">
    		        <label for="title">City <span class="require">*</span></label>
                <select defaultValue="" id="inputState" className="form-control" onChange={(e)=>{
                  setCity(e.target.value);
                }}>
         <option value="" disabled >Choose Mazad City</option>
         <option value='Al Bukayriyah'>Al Bukayriyah</option>
         <option value='Riyadh'>Riyadh</option>
         <option value='Abha'>Abha</option>
         <option value='Buraydah'>Buraydah</option>
         <option value='Dammam'>Dammam </option>
         <option value='Jeddah'>Jeddah</option>
         <option value='Al Majma’ah'>Al Majma’ah</option>
         <option value='Mecca'>Mecca</option>
         <option value='Medina'>Medina</option>
         <option value='Qadeimah'>Qadeimah</option>
      </select>
    		    </div>

            <div class="form-group">
    		        <label for="title">Mazad Type<span class="require">*</span></label>
                <select defaultValue=""  id="inputState" className="form-control" onChange={(e)=>{
                  setType(e.target.value);
                }}>
         <option value="" disabled>Choose Mazad Type</option>
         <option value='Cars'>Cars</option>
         <option value='Estate'>Estate</option>
         <option value='Houses'>Houses</option>
      </select>
    		    </div>
    		    
    		    <div class="form-group has-error">
    		        <label for="slug">Price<span class="require">*</span></label>
    		        <input type="number" class="form-control" name="slug" onChange={(e)=>{
                  setPrice(e.target.value);
                }}/>
    		    </div>

    		    <div class="form-group has-error">
    		        <label for="slug">Number of hours<span class="require">*</span></label>
    		        <input type="number" class="form-control" name="slug" onChange={(e)=>{
                  setDate(e.target.value);
                }}/>
    		    </div>

    		    <div class="form-group">
    		        <label for="description">Description<span class="require">*</span></label>
    		        <textarea rows="5" class="form-control" name="description" onChange={(e)=>{
                  setDescription(e.target.value);
                }}></textarea>
    		    </div>
            <label for="formFileSm" class="form-label">Picture</label>
        <input class="form-control mb-4" type="file" id="formFileMultiple" multiple onChange={(e)=>{
                  setImg(e.target.value);
                }} />
    		    
    		    <div class="form-group text-center">
    		        <button type="button" class="btn btn-primary" onClick={()=>{
                  const post = {
                            "post":
                            {
                                "title":title,
                                "city":city,
                                "content":description,
                                "images":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
                                "post_type":type,
                                "price":price
                            },
                            "user_id":user.user_id
                        }
                        axios.post(`http://localhost:8080/posts`, post)
                          .then(response => {});
                             
                             window.location = "/auctions"}}>
    		            Create
    		        </button>

    		    </div>
    		    
		</div>
		
	</div>
</div>
  </>);
}

export default AddPost;
