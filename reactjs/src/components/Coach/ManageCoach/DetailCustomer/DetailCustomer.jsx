import { useParams } from "react-router-dom"
import "./DetailCustomer.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import axiosInstance from "../../../Axios/axios";
export default function DetailOfCustomer() {
    const params = useParams();
    var coach = localStorage.getItem("authcoach")
    if (coach) {
        coach = JSON.parse(coach)
        var token = coach.data.auth_token;
    }
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const [getDetailData, setDetailData] = useState('')
    useEffect(() => {
        getDetail();
    }, []);
    
    function getDetail() {
        axiosInstance.get(`/getBodyById/${params.id}`, config)
            .then((response) => {
                setDetailData(response.data.customer[0])
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function renderDetail() {
        if (Object.keys(getDetailData).length > 0) {
            const imageUrl = getDetailData.image ? `http://localhost/BE/public/${getDetailData.image}` : 'http://localhost/BE/public/images/Image14.png';
            return (
                <div className="row justify-content-center mb-4">
                    <div className="col-sm-6 center">
                        <img src={imageUrl} alt="Customer" className="mb-3" />
                        <p>{getDetailData.name}</p>
                        <p>{dayjs(getDetailData.DOB).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
            );
        }
    }
    return (
        <div id="DetailCustomer">
            <div className="container">
                {renderDetail()}
                <div className="row justify-content-center">
                    <div className="col-sm-10 border-detail mb-5">
                        <div className="row">
                        <div className="col-sm-6 mt-5 mb-4">
                                <p><span>Height:</span> {getDetailData.height}m</p>
                                <p><span>Sex:</span> Female</p>
                                <p><span>Ankle:</span> {getDetailData.ankle} cm</p>
                                <p><span>Knee:</span> {getDetailData.knee} cm</p>
                                <p><span>Neck:</span> {getDetailData.neck} cm</p>
                                <p><span>Chest:</span> {getDetailData.chest} cm</p>
                            </div>
                            <div className="col-sm-6 mt-5 mb-4">
                                <p><span>Abdomen:</span> {getDetailData.abdomen} cm</p>
                                <p><span>Hip:</span> {getDetailData.hip} cm</p>
                                <p><span>Thigh:</span> {getDetailData.thigh} cm</p>
                                <p><span>Biceps:</span> {getDetailData.biceps} cm</p>
                                <p><span>Forearm:</span> {getDetailData.forearm} cm</p>
                                <p><span>Wrist:</span> {getDetailData.wrist} cm</p>
                            </div>
                            <div className="col-sm-12 center mb-3">
                                <p className="red bodyfat">Your Body_Fat: <span>{getDetailData.bodyfat}%</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 center mb-5">
                        <Link to={"/coach/calendar/" +params.id}><div className="btn btn-schedule">Schedule</div></Link>
                        <Link to={"/coach/history/detail/" +params.id}><div className="btn btn-history">History</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
