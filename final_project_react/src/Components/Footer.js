import '../App.css';

function Footer() {
  return (
  <footer className="site-footer">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <h6>About</h6>
        <p className="text-justify">What is an online auction? The electronic auction platform is one of the smart solutions developed and operated by Thiqa Company, which enables those interested in auctions to participate in auctions electronically without the need to come to the auction site and complete all financial transactions safely and electronically and in accordance with the laws of holding auctions, buying and selling in the Kingdom of Saudi Arabia. The platform serves government and private agencies in liquidating their assets and managing auctions electronically.</p>
      </div>

      <div className="col-xs-6 col-md-3">
        <h6>Categories</h6>
        <ul className="footer-links">
          <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
          <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
          <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
          <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
          <li><a href="http://scanfcode.com/category/android/">Android</a></li>
          <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
        </ul>
      </div>

      <div className="col-xs-6 col-md-3">
        <h6>Quick Links</h6>
        <ul className="footer-links">
          <li><a href="http://scanfcode.com/about/">About Us</a></li>
          <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
          <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
          <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
          <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
        </ul>
      </div>
    </div>
    <hr/>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-8 col-sm-6 col-xs-12">
        <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
     <a href="#"> Tameem Alsulmi</a>.
        </p>
      </div>

      <div className="col-md-4 col-sm-6 col-xs-12">
        <ul className="social-icons">
          <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
          <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a className="dribbble" href="#"><i className="fa fa-instagram"></i></a></li>
          <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
        </ul>
      </div>
    </div>
  </div>
</footer>
  );
}

export default Footer;
