import "./MyCoach.css";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../Axios/axios";
import { Link } from "react-router-dom";

export default function MyCoach() {
    var customer = localStorage.getItem("authcustomer")
    if (customer) {
        customer = JSON.parse(customer);
        var token = customer.data.auth_token;
        var id = customer.data.auth.id;
    }
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const [getData, setData] = useState([])
    useEffect(() => {
        getUser();
    }, []);
    function getUser() {
        axiosInstance.get(`/getMyCoach`, config)
            .then((response) => {
                setData(response.data.data)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function renderUser() {
        return getData.map((value, index) => (
            <div className="col-sm-8">
                <div className="row ManageCoach_detail mb-5">
                    <div className="col-sm-3">
                        <img src="http://localhost/BE/public/images/Image10.png" alt={8888} />
                    </div>
                    <div className="col-sm-9 ManageCoach_padding">
                        <p className="ManageCoach_name">{value.name}</p>
                        <div className="ManageCoach_padding ManageCoach_items">
                            <p className="ManageCoach_location mb-2"><i className="fa-solid fa-location-dot" /> <span>{value.address}</span></p>
                            <p className="ManageCoach_birth mb-2"><i className="fa-solid fa-calendar-days" /><span>{value.DOB}</span></p>
                            <p className="ManageCoach_email mb-2"><i className="fa-regular fa-envelope" /><span>{value.email}</span></p>
                            <p className="ManageCoach_phone mb-2"><i className="fa-solid fa-graduation-cap" /><span>{value.phone}</span></p>
                        </div>
                        <div className="ta-end">
                            <Link to={"/user/mycoach/schedule/" + value.id_user}><button className="btn">Schedule</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }
    return (
        <div id="ManageCoach">
            <div className="container">
                <div className="row justify-content-center">
                    {renderUser()}
                </div>
            </div>
        </div>
    )
}