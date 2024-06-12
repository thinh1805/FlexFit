import { useEffect, useState } from "react"
import "./Slider.css"
import { Link } from "react-router-dom"
import axios from "axios";
export default function Slider() {
    var customer = localStorage.getItem("authcustomer")
    if (customer) {
        customer = JSON.parse(customer);
        var token = customer.data.auth_token;
        var id = customer.data.auth.id;
    }
    return (
        <div id="slider">
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 mt-5 pl-38">
                        <p className="slider_title">Body control becomes easy with <span>FlexFit.</span></p>
                        <p>Provide a workout regimen with nutritious meals by using FlexFit to explore our exciting features</p>
                        <Link to={`http://127.0.0.1:5502/reactjs/src/components/Body/index.html?token=${token}&id=${id}`}><button className="btn">Get Started</button></Link>
                    </div>
                    <div className="col-sm-7 center">
                        <div className>
                            <img src="http://localhost/BE/public/images/Image1.jpg" alt={8888} className="img-slider" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}