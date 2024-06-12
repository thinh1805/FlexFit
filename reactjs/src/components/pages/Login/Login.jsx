import "./Login.css"
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import Error from "../../layout/Error/Error";
export default function Login() {
    const navigate = useNavigate();
    const [inputs, setInput] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        
        if (inputs.email == "" && inputs.password == "") {
            setModalVisible3(true)
            flag = false;
        }else{
            if (inputs.email == "") {
                setModalVisible2(true)
                flag = false;
            }
            if (inputs.password == "") {
                setModalVisible1(true)
                flag = false
            }
        }
        
        if (!flag) {
            setErrors(errorSubmit);
        }
        if (flag) {
            const data = {
                email: inputs.email,
                password: inputs.password
            }
            console.log(data)
            axiosInstance.post("/login", data)
                .then(response => {
                    if (response.data.user) {
                        if (response.data.user.role_id == 1) {
                            var authcustomer = {}
                            authcustomer.data = {}
                            authcustomer.data.auth_token = response.data.token
                            authcustomer.data.auth = response.data.user
                            localStorage.setItem("authcustomer", JSON.stringify(authcustomer))
                            navigate('/')
                        }
                        else if (response.data.user.role_id == 2) {
                            var authcoach = {}
                            authcoach.data = {}
                            authcoach.data.auth_token = response.data.token
                            authcoach.data.auth = response.data.user
                            localStorage.setItem("authcoach", JSON.stringify(authcoach))
                            navigate('/')
                        }else{
                            setModalVisible(true)
                        }
                    } 
                })
                .catch(function (error) {
                    setModalVisible(true)
                })
        }
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
                                <div className="modal-header mb-2">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-2">
                                    Login failed. Incorrect account or password
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible(false);
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
                                <div className="modal-header mb-2">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-2">
                                    Please Enter Password
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible1(false);
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
    function renderModal2() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible2 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible2 ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-2">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-2">
                                    Please Enter Email
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible2(false);
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
    function renderModal3() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible3 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible3 ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-2">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-2">
                                    Please Enter Email And Password
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible3(false);
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
        <div id="login">
            <div className="container">
                <div className="row border-login">
                    <div className="col-sm-5  padding-login">
                        <div className="row">
                            <div className="col-sm-12 mt-3 d-flex justify-content-center login_logo align-items-center">
                                <img src="http://localhost/BE/public/images/Image8.jpg" alt="8888" />
                                <p className="login_logo_name mbt-0">FlexFit</p>
                            </div>

                        </div>
                        <div className="mt-4 center">
                            <p className="login_title red">LOGIN</p>
                        </div>
                        <form action className="login_form" onSubmit={handleSubmit}>
                            <div>
                                <p className="gray">Email Address</p>
                                <input className="mb-3" type="text" name="email" placeholder="alex@gmail.com" onChange={handleInput} /><i className="fa-regular fa-envelope" />
                            </div>
                            <div>
                                <p className="gray">Password</p>
                                <input className="mb-4" type="password" name="password" placeholder="Enter your password" onChange={handleInput} /><i className="fa-solid fa-key" />
                            </div>
                            <div className="login_btn_login">
                                <button className="btn">Login now</button>
                            </div>
                            <div className="flex mt-3">
                                <div className="login_border_left"></div>
                                <p className="gray mbt-0">OR</p>
                                <div className="login_border_right"></div>
                            </div>
                            <div className="login_btn_sign_up">
                                <Link to="/user/public/register" className="btn">Sign up now</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6 login_ml">
                        <div className="login_image">
                            <img src="http://localhost/BE/public/images/Image7.jpg" alt={8888} className="hover-effect" />
                        </div>
                    </div>
                    <div>
                        <Error errors={errors} />
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal1()}
            {renderModal2()}
            {renderModal3()}
        </div>
    )
}