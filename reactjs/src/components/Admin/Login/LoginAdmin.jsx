import "./LoginAdmin.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Axios/axios";
export default function LoginAdmin() {
    const navigate = useNavigate();
    
    const [inputs, setInput] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        console.log(nameInput)
        console.log(value)
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (inputs.email == "") {
            errorSubmit.email = "Please enter email";
            flag = false;
        }
        if (inputs.password == "") {
            errorSubmit.password = "Please enter your password";
            flag = false;
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
                    if(response.data.user.role_id === 0){
                        var auth={}
                        auth.admin={}
                        auth.admin.auth_token=response.data.token
                        auth.admin.information=response.data.user
                        localStorage.setItem("authAdmin",JSON.stringify(auth))
                        navigate("/admin/meal")
                    }
                    else{
                        alert("Sai tài khoản hoặc mật khẩu")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    alert("thinh")
                })
        }
    }
    return (
        <div id="loginAdmin">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 ta-end login_logo">
                        <img src="http://localhost/BE/public/images/Image8.jpg" alt={8888} />
                    </div>
                    <div className="col-sm-6 login_logo_name">
                        <p className>Flexfit</p>
                    </div>
                    <div className="col-sm-12 center mb-4">
                        <div className="login_title">
                            <p>Login Admin</p>
                        </div>
                    </div>
                    <div className="col-sm-12 center">
                        <form className="login_form" onSubmit={handleSubmit}>
                            <div className>
                                <p className="login_form_email">Email Address:</p>
                                <input type="text" className="mb-3" name="email" placeholder="alex@gmail.com" onChange={handleInput} /><i className="fa-regular fa-envelope"/>
                            </div>
                            <div>
                                <p className="login_form_password">Password:</p>
                                <input type="password" className="mb-3" name="password" placeholder="Enter your password" onChange={handleInput} /><i className="fa-solid fa-key"/>
                            </div>
                            <div className="login_form_btn">
                                <button className="btn">Login Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}