import { Link, useNavigate } from "react-router-dom";
import "./Changepassword.css";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../Axios/axios";
export default function ChangePassword() {
    // var customer = localStorage.getItem("authcustomer")
    // if (customer) {
    //     customer = JSON.parse(customer);
    //     console.log(customer)
    // }
    const navigate = useNavigate();
    const [getUrl, setUrl] = useState('/change-pass')
    const [message, setMessage] = useState(null);
    // const [getToken, setToken] = useState(customer.data.auth_token)
    // let config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + getToken,
    //         'Content-Type': 'application/json',
    //     }
    // };
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputs, setInput] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        console.log(value)
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        // if (!flag) {
        //     setErrors(errorSubmit);
        // }
        if (inputs.newPassword !== inputs.confirmNewPassword) {
            setMessage("New password and confirm password do not match.");
            return
        }
        if (flag) {
            var customer = localStorage.getItem("authcustomer")
            var coach = localStorage.getItem("authcoach")
            if (customer) {
                customer = JSON.parse(customer);
                var token = customer.data.auth_token;
            }
            
            if (coach) {
                coach = JSON.parse(coach)
                var token = coach.data.auth_token;
            }
            if (!token) {
                console.log("Authentication token not found!");
                return;
            }
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            const data = {
                old_password: inputs.oldPassword,
                new_password: inputs.newPassword,
            }
            axiosInstance.post(getUrl, data, config)
                .then(response => {
                    console.log(response)
                    setMessage("You have successfully changed your password. Please log in again.");
                    setModalVisible(true)
                })
                .catch(function (error) {
                    console.log(error)
                    setMessage("An error occurred while changing the password. Please try again.");
                    setModalVisible(true)
                })
        }
    }
    // function renderModal() {
    //     return (
    //         <div>
    //             {/* Your existing code */}
    //             {isModalVisible && (
    //                 <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
    //                     <div className="modal-dialog">
    //                         <div className="modal-content">
    //                             {/* Modal Header */}
    //                             <div className="modal-header mb-2">
    //                                 <h4 className="modal-title">
    //                                     Notification
    //                                 </h4>
    //                             </div>
    //                             {/* Modal body */}
    //                             <div className="modal-body mb-2">
    //                                 You Have Successfully Changed Your Password. Please Log In Again
    //                             </div>
    //                             {/* Modal footer */}
    //                             <div className="modal-footer">
    //                                 <button
    //                                     type="button"
    //                                     className="btn btn-success"
    //                                     data-bs-dismiss="modal"
    //                                     onClick={() => {
    //                                         navigate('/user/public/login');
    //                                         localStorage.clear();
    //                                     }}
    //                                 >
    //                                     Close
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }
    function renderModal(message) {
        return (
          <div>
            {/* Your existing code */}
            {message && (
              <div className="modal modal-notification" id="myModal" style={{ display: message ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header mb-2">
                      <h4 className="modal-title">
                        Notification
                      </h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body mb-2">
                      {message}
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setMessage(null);
                            setModalVisible(false);
                            if (message === "You have successfully changed your password. Please log in again.") {
                                navigate('/user/public/login');
                                localStorage.clear();
                            }
                        }} // Đặt state hoặc đóng modal theo cách bạn muốn
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
        <div id="changePassword">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 changePassword_border mb-5">
                        <div className="mb-5 changePassword_setting">
                            <a href="#"><i className="fa-solid fa-chevron-left" /><span className="fs-20 font-weight">Settings</span></a>
                        </div>
                        <div className="changePassword_detail">
                            <Link to="/user/edit_information" className="mb-5"><i className="fa-solid fa-pencil" /><span className="near_gray">Edit
                                profile</span></Link>
                            <a href data-bs-toggle="collapse" className="mb-4 arrow-link" data-bs-target="#demo"><i className="fa-solid fa-shield" /><span className="near_gray">Security</span></a>
                            <div id="demo" className="collapse padding-security show">
                                <Link to="/user/changepassword"><i className="fa-solid fa-key" />Change the password</Link>
                                {/* <Link className="mt-4" to="/user/disableaccount"><i className="fa-solid fa-ban" />Disable Account</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm-12 changePassword_padding">
                                <p className="red font-weight fs-25 changePassword_title mb-5">Change The Password</p>
                            </div>
                            <div className="col-sm-10 changePassword_padding">
                                <form className="mb-5" onSubmit={handleSubmit}>
                                    <div>
                                        <p className="font-weight">Old Password</p>
                                        <input type="password" className="w-100 mb-4" name="oldPassword" onChange={handleInput} required />
                                    </div>
                                    <div>
                                        <p className="font-weight">New Password</p>
                                        <input type="password" className="w-100 mb-4" name="newPassword" onChange={handleInput} required />
                                    </div>
                                    <div>
                                        <p className="font-weight">Re-Enter New Password</p>
                                        <input type="password" className="w-100 mb-4" name="confirmNewPassword" onChange={handleInput} required />
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12 center">
                                            <div className="btn-save">
                                                <button className="btn">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderModal(message)}
        </div>
    )
}