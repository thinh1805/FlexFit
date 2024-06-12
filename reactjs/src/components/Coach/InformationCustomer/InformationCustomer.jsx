import "./InformationCustomer.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import axiosInstance from "../../Axios/axios";
export default function InformationCustomer() {
    const [getDetailData, setDetailData] = useState('')
    let params = useParams();
    // console.log(params.id)
    const navigate = useNavigate();
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
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_intermediate = searchParams.get('id');
    useEffect(() => {
        getDetail();
    }, []);
    function accept() {
        const data = {
            data: true,
        }
        axiosInstance.post(`/receiveRequest/`+id_intermediate, data, config)
            .then((response) => {
                setModalVisible1(true)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function getDetail() {
        axiosInstance.get(`/getBodyById/${params.id}`, config)
            .then((response) => {
                setDetailData(response.data.customer[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function cancel() {
        const data = {
            data: false,
        }
        axiosInstance.post(`/receiveRequest/`+id_intermediate, data, config)
            .then((response) => {
            })
            .catch(function (error) {
                setModalVisible(true)
            })
    }
    function renderModal() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-4">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-3">
                                    Refuse Successfully
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible(false);
                                            navigate("/")
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    function renderModal1() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible1 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible1 ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-4">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-3">
                                    Accepted Successfully!
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible1(false);
                                            navigate("/coach/manageCoach")
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div id="Informationcustomer">
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-sm-6 center">
                        <img src="http://localhost/BE/public/images/Image14.png" alt="" className="mb-3" />
                        <p>{getDetailData.name}</p>
                        <p>{dayjs(getDetailData.DOB).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-10 border-detail mb-5">
                        <div className="row">
                            <div className="col-sm-6 mt-5 mb-5">
                                <p><span>Height:</span> {getDetailData.height} m</p>
                                <p><span>Sex:</span> Female</p>
                                <p><span>Age:</span> {getDetailData.age} </p>
                                <p><span>Ankle:</span> {getDetailData.ankle} cm</p>
                                <p><span>Knee:</span> {getDetailData.knee} cm</p>
                                <p><span>Neck:</span> {getDetailData.neck} cm</p>
                                <p><span>Chest:</span> {getDetailData.chest} cm</p>
                            </div>
                            <div className="col-sm-6  mt-5 mb-5">
                                <p><span>Weight:</span> {getDetailData.weight} kg</p>
                                <p><span>Abdomen:</span> {getDetailData.abdomen} cm</p>
                                <p><span>Hip:</span> {getDetailData.hip} cm</p>
                                <p><span>Thigh:</span> {getDetailData.thigh} cm</p>
                                <p><span>Biceps:</span> {getDetailData.biceps} cm</p>
                                <p><span>Forearm:</span> {getDetailData.forearm} cm</p>
                                <p><span>Wrist:</span> {getDetailData.wrist} cm</p>
                            </div>
                            <div className="col-sm-12 center">
                                <p className="red">Your Body_Fat: <span>{getDetailData.bodyfat}%</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 center mb-5">
                        {/* <div className="btn btn-cancel" onClick={cancel}>Cancel</div> */}
                        <div className="btn btn-accept" onClick={accept}>Accept</div>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal1()}
        </div>
    )

}