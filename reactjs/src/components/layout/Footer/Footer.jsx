import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 mt-5 mb-4">
                        <div className="footer_title ta-end">
                            <a href="home.html" className="footer-logo-title"><img src="http://localhost/BE/public/images/Image8.jpg" alt={8888} /><span className="font-weight">FlexFit</span></a>
                        </div>
                    </div>
                    <div className="col-sm-6 footer_description mt-5 mb-4">
                        <p className><span>FlexFit</span> is a private virtual network that has unique features and has high security</p>
                    </div>
                    <div className="col-sm-12 center mb-5 mt-3">
                        <Link to={"https://www.facebook.com"}><i className="fa-brands fa-facebook mr" /></Link>
                        <Link to={"https://www.instagram.com"}><i className="fa-brands fa-instagram mr" /></Link>
                        <Link to={"https://x.com/?lang=vi"}><i className="fa-brands fa-twitter" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}