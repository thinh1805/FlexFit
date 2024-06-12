import "./ManageCoach.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function ManageForCoach() {
    var coach = localStorage.getItem("authcoach")
    if (coach) {
        coach = JSON.parse(coach)
        var token = coach.data.auth_token;
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
        axiosInstance.get(`/getBody`, config)
            .then((response) => {
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function renderUser() {
        if (Array.isArray(getData) && getData.length > 0) {
            return getData.map((value, index) => (
                <div className="col-sm-8">
                    <div className="row ManageCoach_detail mb-3">
                        <div className="col-sm-3 img-flex">
                            <img src="http://localhost/BE/public/images/Image10.png" alt={8888} />
                        </div>
                        <div className="col-sm-9 ManageCoach_padding">
                            <p className="ManageCoach_name mb-3 mt-4">{value.name}</p>
                            <div className="ManageCoach_padding ManageCoach_items">
                                <p className="ManageCoach_location mb-2"><i className="fa-solid fa-location-dot" /> <span>Đà Nẵng</span></p>
                                <p className="ManageCoach_birth mb-2"><i className="fa-solid fa-calendar-days" /><span>{value.DOB}</span></p>
                                <p className="ManageCoach_email mb-2"><i className="fa-regular fa-envelope email" /><span>{value.email}</span></p>
                                <p className="ManageCoach_phone mb-2"><i className="fa-solid fa-phone"/><span>{value.phone}</span></p>
                            </div>
                            <div className="ta-end">
                                <Link to={"/coach/manageCoach/detail/" + value.id_user}><button className="btn">Detail</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        } else {
            return (
                <div class="height">
                    <p>
                        There are currently no customers renting
                    </p>
                </div>
            )
        }
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