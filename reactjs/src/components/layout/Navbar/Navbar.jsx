import { Link } from "react-router-dom"
import "./Navbar.css";
export default function Navbar() {
    return (
        <div className="col-sm-2">
            <div className="border-container">
                <div className="logo flex mt-3 justify-content-center">
                    <img src="http://localhost/BE/public/images/Image8.jpg" alt={8888} />
                    <p>FlexFit</p>
                </div>
                <div className="mt-3 ms-4 menu_detail">
                    <div className="flex mb-4">
                        <Link to="/admin/user"><i className="fa-solid fa-user" />User </Link>
                    </div>
                    <div className="flex mb-4">
                        <Link to="/admin/coach"><i class="fa-solid fa-hammer"></i>Coach</Link>
                    </div>
                    <div className="flex mb-4">
                        <Link to="/admin/meal"><i className="fa-solid fa-utensils" />Add meals</Link>
                    </div>
                    <div className="flex mb-4">
                        <Link to="/admin/exercise"><i className="fa-solid fa-dumbbell" />Add Exercises</Link>
                    </div>
                    <div className="flex mb-4">
                        <Link to="/admin/payment"><i className="fa-regular fa-credit-card" />Payment</Link>
                    </div>
                    <div className="flex mb-4">
                        <Link to="/admin/approve"><i class="fa-solid fa-paper-plane"/>Approve</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}