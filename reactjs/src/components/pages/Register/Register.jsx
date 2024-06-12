import "./Register.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";

// Modal Component
function Modal({ isVisible, message, onClose }) {
  if (!isVisible) return null;
  return (
    <div className="modal modal-notification mb-4" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content modal-createPost">
          <div className="modal-header mb-4">
            <h4 className="modal-title white">Notification</h4>
          </div>
          <div className="modal-body mb-3">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [modalInfo, setModalInfo] = useState({ isVisible: false, message: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const validateInputs = () => {
    const errorMessages = {};
    // Biểu thức chính quy cập nhật để không cho phép các phần local chỉ chứa số
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const containsLetter = /[a-zA-Z]/;

    let isValid = true;

    if (!inputs.email || !inputs.password || !inputs.confirmpassword) {
      setModalInfo({ isVisible: true, message: "Please enter Email, Password and Confirm password." });
      isValid = false;
    } else {
      if (!isEmailValid.test(inputs.email) || !containsLetter.test(inputs.email.split('@')[0])) {
        setModalInfo({ isVisible: true, message: "Invalid email. Please include a valid domain and at least one alphabetic character in the local section." });
        isValid = false;
      } else if (inputs.password.length < 8) {
        setModalInfo({ isVisible: true, message: "Please enter a password with at least 8 characters." });
        isValid = false;
      } else if (inputs.password !== inputs.confirmpassword) {
        setModalInfo({ isVisible: true, message: "Password and Confirm Password do not match." });
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(errorMessages);
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const data = {
        email: inputs.email,
        password: inputs.password,
        role_id: 1,
      };
      axiosInstance.post("/register", data)
        .then(response => {
          console.log(response)
          setModalInfo({ isVisible: true, message: "Successfully Registered, Please Log In" });
          setTimeout(() => {
            navigate('/user/public/login'); // Redirect to login page after successful registration
          }, 1500); // Delay to show the success message before redirecting
        })
        .catch(error => {
          setModalInfo({ isVisible: true, message: "Email already exists" });
        });
    }
  };

  return (
    <div id="register">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mt-2 d-flex justify-content-center regitser_logo align-items-center">
            <img src="http://localhost/BE/public/images/Image8.jpg" alt="8888" />
            <p className="register_logo_name mbt-0">FlexFit</p>
          </div>
          <div className="col-sm-12 center">
            <div className="register_title">
              <p>Register</p>
            </div>
          </div>
          <div className="col-sm-12 center">
            <form className="register_form" onSubmit={handleSubmit}>
              <div>
                <p className="register_form_email">Email Address:</p>
                <input
                  type="text"
                  className="mb-3"
                  name="email"
                  placeholder="alex@gmail.com"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  
                  onChange={handleInput}
                />
                <i className="fa-regular fa-envelope" />
              </div>
              <div>
                <p className="register_form_password">Password:</p>
                <input
                  type="password"
                  className="mb-3"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInput}
                />
                <i className="fa-solid fa-key" />
              </div>
              <div>
                <p className="register_form_confirm_password">Confirm Password:</p>
                <input
                  type="password"
                  className="mb-4"
                  name="confirmpassword"
                  placeholder="Re-Enter your password"
                  onChange={handleInput}
                />
                <i className="fa-solid fa-key" />
              </div>
              <div className="register_form_btn">
                <button className="btn">Register now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isVisible={modalInfo.isVisible}
        message={modalInfo.message}
        onClose={() => setModalInfo({ isVisible: false, message: "" })}
      />
    </div>
  );
}