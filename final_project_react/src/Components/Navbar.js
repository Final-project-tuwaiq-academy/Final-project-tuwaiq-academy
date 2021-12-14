import '../App.css';
import Logo from '../Img/m.png'

function Navbar() {
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
                    <a href="/login" className="nav-item nav-link text-white"><b>Login</b></a>
                </div>
            </div>
        </div>
    </nav>
</div>
  );
}

export default Navbar;
