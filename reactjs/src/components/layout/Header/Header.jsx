import "./Header.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../Axios/axios";
export default function Header() {
    const navigate = useNavigate();
    var admin = localStorage.getItem("authAdmin")
    var customer = localStorage.getItem("authcustomer")
    var coach = localStorage.getItem("authcoach")
    const [coachId, setCoachId] = useState("");
    const [getIdCurrent, setIdCurrent] = useState("")
    const [getcustomer, setCustomer] = useState([]);
    const [getStatus, setStatus] = useState("")
    const [getAvatar,setAvatar] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    if (admin) {
        admin = JSON.parse(admin);
    }
    if (customer) {
        customer = JSON.parse(customer);
        var token = customer.data.auth_token;
        var id = customer.data.auth.id;
    }
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
    useEffect(() => {
        getRequestFromCustomer();
        getIdCoachCurrent();
        name();
    }, []);

    // Contact
    function name() {
        axiosInstance.get(`/get-data-user`, config)
            .then((response) => {
                if(response.data.customer){
                    
                    setAvatar(response.data.customer.image)
                }else if(response.data.coach){
                    setAvatar(response.data.coach.image)
                }
                if (response.data.customer.name === null) {
                    setModalVisible(true)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function renderContact() {
        if (customer) {
            return (
                <div className="header-content">
                    <a href="/introduce">About</a>
                    <a href="#">FeedBack</a>
                    <Link to={`http://127.0.0.1:5501/reactjs/src/components/Body/index.html?token=${token}&id=${id}`}>
                        Calculator % bodyfat
                    </Link>
                    <a href="/contact">Contact</a>
                </div>
            )
        }
        else if (coach) {
            return (
                <div className="header-content-coach">
                    <a href="/introduce">About</a>
                    <a href="#">FeedBack</a>
                    <a href="/contact">Contact</a>
                </div>
            )
        }
        else {
            return (
                <div className="header-content">
                    <a href="#">About</a>
                    <a href="#">FeedBack</a>
                    <Link to="/user/service/body">Calculator % bodyfat</Link>
                    <a href="#">Contact</a>
                </div>
            )
        }
    }
    function getRequestFromCustomer() {
        if (coach) {
            axiosInstance.get(`/getRequest`, config)
                .then((response) => {
                    const customers = response.data.data;
                    const id = customers.map(customer => {
                        return customer.id_coach; // Chỉ lấy họ của khách hàng
                    });
                    setCoachId(id); // Lưu id_coach vào state
                    setCustomer(response.data.data); // Lưu tên của khách hàng vào mảng state
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    function getIdCoachCurrent() {
        axiosInstance.get(`/get-data-user`, config)
            .then((response) => {
                if (response.data.coach) {
                    setIdCurrent(response.data.coach.id)
                }
                if (response.data.user) {
                    setStatus(response.data.user.status)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Role
    function renderRole() {
        if (customer) {
            return (
                <div className="red role"><p>Customer</p></div>
            )
        } else if (coach) {
            return (
                <div className="red role"><p>Coach</p></div>
            )
        }
    }
    function renderNameCustomer() {
        // console.log(getIdCurrent == coachId)
        if (Array.isArray(coachId) && coachId.includes(getIdCurrent)) {
            return getcustomer.map((value, key) => {
                console.log(value)
                if (value.name) {
                    const fullName = value.name
                    const nameParts = fullName.split(' ');

                    // Lấy lastName từ phần tử cuối cùng của mảng
                    const lastName = nameParts.pop();
                    return (
                        <div>
                            <div className="flex notification-information">
                                <i className="fa-regular fa-bell"></i>
                                <Link to={"/coach/manageCoach/InformationCustomer/" + value.id_user + "?id=" + value.id} className="hire" ><p>{lastName} muốn thuê bạn</p></Link>
                            </div>
                        </div>
                    )
                }
            })
        } else {
            return (
                <div>
                    {renderAccept()}
                </div>
            )
        }
    }
    function renderAccept() {
        if (coach) {
            return (
                <div className="flex">
                    <i className="fa-regular fa-bell"></i>
                    <p>Congration !! You became the coach</p>
                </div>
            )
        }
    }
    function notification() {
        return (
            <div class="dropdown margin-right border-dropdown">
                <i class="fa-regular fa-bell bell-main" data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                    <p class="title center">Notification</p>
                    {renderNameCustomer()}
                </ul>
            </div>
        )
    }
    // Logout
    function renderLogout() {
        if (customer) {
            return (
                <div className="flex justify-content-center">
                    <div class="dropdown margin-right border-dropdown">
                        <i class="fa-regular fa-bell bell-main" data-bs-toggle="dropdown"></i>
                        <ul className="dropdown-menu">
                            <p class="title center">Notification</p>
                        </ul>
                    </div>
                    <div className="dropdown user">
                    <img src={getAvatar !== null ? `http://localhost/BE/public/${getAvatar}` : "http://localhost/BE/public/images/Image14.png"} alt="Avatar" data-bs-toggle="dropdown" />
                        <ul className="dropdown-menu">
                            <li><Link to="/user/edit_information" className="dropdown-item"><i class="fa-solid fa-user"></i>Information</Link></li>
                            <li><Link to="/user/mycoach" className="dropdown-item"><i class="fa-solid fa-calendar-days"></i>Schedule</Link></li>
                            <li><Link to="/user/myInvoice" className="dropdown-item"><i class="fa-solid fa-receipt"/> My Invoices</Link></li>
                            <li><button className="dropdown-item" onClick={Logout}><i class="fa-solid fa-right-from-bracket"></i>Logout</button></li>
                        </ul>
                    </div>
                    <div className="Role">
                        {renderRole()}
                    </div>
                </div>
            )
        } else if (coach) {
            return (
                <div className="flex justify-content-center">
                    {notification()}
                    <div className="dropdown user">
                        <img src="http://localhost/BE/public/images/Image14.png" alt="8888" data-bs-toggle="dropdown" />
                        <ul className="dropdown-menu">
                            <li><Link to="/user/edit_information" className="dropdown-item"><i class="fa-solid fa-user"></i>Information</Link></li>
                            <li><Link to="/coach/manageCoach" className="dropdown-item"><i class="fa-solid fa-users-rectangle"></i>ManageCoach</Link></li>
                            <li><button className="dropdown-item" onClick={Logout}><i class="fa-solid fa-right-from-bracket"></i>Logout</button></li>
                        </ul>
                    </div>
                    <div className="Role">
                        {renderRole()}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/user/public/login"><button className="btn btn-sign-in">Sign in</button></Link>
                    <Link to="/user/public/register"><button className="btn btn-sign-up">Sign up</button></Link>
                </div>
            )
        }
    }
    function Logout() {
        if (customer) {
            navigate('/user/public/login')
        } else if (coach) {
            navigate('/user/public/login')
        }
        localStorage.clear();
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
                                    You must fill in information
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-click"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible(false);
                                            navigate('/user/edit_information');
                                        }}
                                    >
                                        Click Here!
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
        <div id="header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="header-logo">
                            <Link to="/" className="header-logo-title"><img src="http://localhost/BE/public/images/Image8.jpg" alt="" /><span className="font-weight">FlexFit</span></Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        {renderContact()}
                    </div>
                    <div className="col-sm-3 center">
                        {renderLogout()}
                    </div>
                </div>
            </div>
            {renderModal()}
        </div>
    )
}