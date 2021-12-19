import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Auctions from './Components/Auctions';
import Login from './Components/Login';
import Sign_Up from './Components/Sign_Up';
import Post from './Components/Post'
import Profile from './Components/Profile';
import UserPosts from './Components/UserPosts';
import Home from './Components/Home';



function App() {

  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/auctions"  element={<Auctions />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/sign_up"  element={<Sign_Up />} />
        <Route path="/post/:id"  element={<Post />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/user_post"  element={<UserPosts />} />
        <Route path="/"  element={<Home />} />

      </Routes>
    </BrowserRouter>

     <Footer/>

     </div>
);
}

export default App;
