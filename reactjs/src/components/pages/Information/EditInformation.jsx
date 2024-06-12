import { Link, useNavigate } from "react-router-dom"
import "./Edit_information.css"
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Token/Token";
import axios from "axios";
import unidecode from "unidecode";
import Error from "../../layout/Error/Error";
import axiosInstance from "../../Axios/axios";
export default function EditInformation() {

  const navigate = useNavigate();
  // const getUser = useContext(TokenContext);

  var customer = localStorage.getItem("authcustomer")
  var coach = localStorage.getItem("authcoach")
  if (customer) {
    customer = JSON.parse(customer);
    var token = customer.data.auth_token;
    var email = customer.data.auth.email;
  }
  if (coach) {
    coach = JSON.parse(coach)
    var token = coach.data.auth_token;
    var email = coach.data.auth.email;
  }
  const [inputs, setInput] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    address: "",
    contact: "",
    sex: "",
  })
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('http://localhost/BE/public/images/Image14.png'); // Lưu trữ URL để hiển thị ảnh
  const [isModalVisible, setModalVisible] = useState(false);
  const [getImageDegreeCoach, setImageDegreeCoach] = useState('');
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [isModalVisible5, setModalVisible5] = useState(false);
  const [isModalVisible6, setModalVisible6] = useState(false);
  const [isModalVisible7, setModalVisible7] = useState(false);
  const [isModalVisible8, setModalVisible8] = useState(false);
  //degree
  const [fileDegree, setFileDegree] = useState("");
  const [getImageDegree, setImageDegree] = useState();

  const [getStatus, setStatus] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  useEffect(() => {
    getInformationUser();
  }, []);
  function getInformationUser() {
    axiosInstance.get('/get-data-user', config)
      .then(response => {
        console.log(response)
        if (response.data.customer) {
          setStatus(response.data.customer.status)
          var userImage = response.data.customer.image;
          console.log(response.data.customer.image)
          const imageUrl = `http://localhost/BE/public/${userImage}`

          const fullName = response.data.customer.name;
          const nameParts = fullName.split(' ');

          // Lấy lastName từ phần tử cuối cùng của mảng
          const lastName = nameParts.pop();
          // Ghép lại các phần tử còn lại để tạo firstName
          const firstName = nameParts.join(' ');
          
          // console.log(response.data.user.DOB)
          setInput({
            firstName: firstName,
            lastName: lastName,
            DOB: response.data.customer.DOB,
            contact: response.data.customer.phone,
            // sex: response.data.user.sex,
            address: response.data.customer.address,
          });
          setImagePreviewUrl(imageUrl);
        }
        else if (response.data.coach) {
          console.log(response.data)
          const fullName = response.data.coach.name;
          const nameParts = fullName.split(' ');
          // Lấy lastName từ phần tử cuối cùng của mảng
          const lastName = nameParts.pop();
          // Ghép lại các phần tử còn lại để tạo firstName
          const firstName = nameParts.join(' ');
          const coachImage = response.data.coach.image;
          // Kiểm tra nếu ảnh là null hoặc undefined hoặc chuỗi rỗng
          const imageUrl = coachImage ? `http://localhost/BE/public/${coachImage}` : "http://localhost/BE/public/images/Image14.png";
          setInput({
            firstName: firstName,
            lastName: lastName,
            DOB: response.data.coach.DOB,
            contact: response.data.coach.phone,
            // sex: response.data.coach.sex,
            address: response.data.coach.address,
          });
          console.log(response.data.coach.address)
          setImagePreviewUrl(imageUrl);
          setImageDegreeCoach(response.data.coach.degree)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);  // Lưu trữ đối tượng File
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleImageResquestBecomeCoach = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageDegree(file);
      setFileDegree(URL.createObjectURL(file));
    }
  };
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput(state => ({ ...state, [nameInput]: value }))
    console.log(value)
  }
  const [errors, setErrors] = useState({})
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    const isAlpha = /^[a-zA-Z\s]+$/;
    const normalizedInputFirstName = unidecode(inputs.firstName);
    const normalizedInputLastName = unidecode(inputs.lastName);
    if(inputs.contact === "" || inputs.address === "" || inputs.firstName ==="" || inputs.lastName === "" || inputs.DOB === ""){
      setModalVisible7(true)
      return;
    }
    if (!isAlpha.test(normalizedInputFirstName) || !isAlpha.test(normalizedInputLastName)) {
      setModalVisible5(true)
      return;
    }  
    if (inputs.contact.length != 10) {
      setModalVisible6(true)
      return;
    }


    if (flag) {
      let name = inputs.firstName + " " + inputs.lastName
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('name', name);
      formData.append('DOB', inputs.DOB);
      formData.append('phone', inputs.contact);
      formData.append('address', inputs.address);
      axiosInstance.post("/update-profile", formData, config)
        .then(response => {
          console.log(response)
          setModalVisible1(true)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  function handleModalRequestCoach() {
    setModalVisible(true);
  }
  function handleRequestBecomeCoach(e) {
    e.preventDefault();
    let flag = true;
    console.log(getImageDegree)
    if (getImageDegree === undefined) {
      setModalVisible(false)
      setModalVisible4(true)
      flag = false;
    } else {
      let size = getImageDegree['size'];
      if (size > 1024 * 1024) {
        setModalVisible(false)
        setModalVisible3(true)
        flag = false;
      }
    }
    if (flag) {
      setUploadStatus("Processing");
      const formData = new FormData();
      formData.append('degree_image', getImageDegree);
      axiosInstance.post("/degree/create", formData, config)
        .then(response => {
          setModalVisible(false)
          setModalVisible2(true)

        })
        .catch(function (error) {
          console.log(error)
          setUploadStatus("");
        })
    }
  }
  function renderModalRequestBecomeCoach() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible && (
          <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }} >
            <div id="becomeCoach">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-sm-8">
                    <form onSubmit={handleRequestBecomeCoach}
                      // Apply(getIdBlog,getIdMember) 
                      // setModalVisible2(false);
                      className="row form-becomeCoach">
                      <div className="padding center">
                        <div className="img-request center mb-4 mt-3">
                          <img src="http://localhost/BE/public/images/Image15.png" alt="" />
                        </div>
                        <div className="title">
                          {fileDegree ? <p>{fileDegree}</p> : <p>Select a file or drag and drop here</p>}
                        </div>
                        <div className="gray mb-3">
                          {fileDegree ? <a href={fileDegree} target="_blank">Check Image</a> : <p>JPG, PNG or PDF, file size no more than 1MB</p>}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageResquestBecomeCoach}
                            style={{ display: "none" }}
                            id="upload-image1"
                          />
                          <label htmlFor="upload-image1" className="btn btn-request mb-3">
                            Select File
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="btn-container mb-4 ta-end">
                          <button className="btn btn-cancel"
                            onClick={() => {
                              setFileDegree("");
                              setModalVisible(false);
                            }}>
                            Cancel
                          </button>
                          <button className="btn btn-upload">Upload</button>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  function renderRequestBecomeCoach() {
    // console.log(getStatus)
    if (customer) {
      if (getStatus == "Waiting" || uploadStatus === "Processing") {
        return (
          <div className="col-sm-11 center become_coach mb-5">
            <button className="btn" onClick={handleModalRequestCoach} disabled={getStatus}>Processing...</button>
          </div>
        )
      } else if (getStatus == "Cancel" || customer) {
        return (
          <div className="col-sm-11 center become_coach mb-5">
            <button className="btn" onClick={handleModalRequestCoach} >Request to become coach</button>
          </div>
        )
      }
    }
  }

  function renderDegree() {
    if (coach) {
      return (
        <div className="flex degree-img">
          <p className="font-weight ">Degree</p>
          <img className="ms-5" src={`http://localhost/BE/public/${getImageDegreeCoach}`} alt="" />
        </div>
      )
    }
  }
  function renderModal() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible1 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible1 ? 'block' : 'none' }}>
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
                  Edited information successfully
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible1(false)}
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
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible2 ? 'block' : 'none' }}>
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
                  Uploaded degree successfully
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible2(false)}
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
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible3 ? 'block' : 'none' }}>
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
                  File size no more than 1MB
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible3(false)}
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
  function renderModal4() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible4 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible4 ? 'block' : 'none' }}>
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
                  Please send your Degree
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible4(false)}
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
  function renderModal5() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible5 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible5 ? 'block' : 'none' }}>
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
                  Please do not include special characters and numbers
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible5(false)}
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
  function renderModal6() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible6 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible6 ? 'block' : 'none' }}>
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
                  Incorrect telephone number
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible6(false)}
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
  function renderModal7() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible7 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible7 ? 'block' : 'none' }}>
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
                  Please fill in information 
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible7(false)}
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
  function renderModal8() {
    return (
      <div>
        {/* Your existing code */}
        {isModalVisible8 && (
          <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible8 ? 'block' : 'none' }}>
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
                  Please enter your phone
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setModalVisible8(false)}
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
  console.log(imagePreviewUrl)
  return (
    <div id="edit_information">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 edit_information_border mb-5">
            <div className="mb-5 edit_information_setting">
              <a href="#"><i className="fa-solid fa-chevron-left" /><span className="fs-20 font-weight">Settings</span></a>
            </div>
            <div className="edit_information_detail">
              <Link to="/user/edit_information" className="mb-5"><i className="fa-solid fa-pencil" /><span className="near_gray">Edit
                profile</span></Link>
              <a href data-bs-toggle="collapse" className="mb-4 arrow-link" data-bs-target="#demo"><i className="fa-solid fa-shield" /><span className="near_gray">Security</span></a>
              <div id="demo" className="collapse padding-security">
                <Link to="/user/changepassword"><i className="fa-solid fa-key" />Change the password</Link>
                {/* <Link className="mt-4" to="/user/disableaccount"><i className="fa-solid fa-ban" />Disable Account</Link> */}
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-4 edit_information_padding">
                <p className="red font-weight fs-25 edit_information_title mb-5">Edit Profile</p>
              </div>
              <div className="col-sm-6 ta-end edit_information_image mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-image"
                />
                <label htmlFor="upload-image">
                  <img
                    src={imagePreviewUrl}
                    alt="Profile"
                    style={{ cursor: "pointer" }}
                  />
                </label>
              </div>
              {renderRequestBecomeCoach()}
              <div className="col-sm-10 edit_information_padding">
                <div className="mb-5">
                  <div className="mb-4">
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight">First Name</p>
                        <input type="text" className="w-90" required name="firstName" onChange={handleInput} value={inputs.firstName} />
                      </div>
                      <div className="col-sm-6 ">
                        <p className="font-weight">Last Name</p>
                        <input type="text" className="w-100" required name="lastName" onChange={handleInput} value={inputs.lastName} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-weight">Day of birth</p>
                    <input type="date" name="DOB" id="txtDate" className="w-100 mb-4" min="1900-01-01" max="2024-19-05" onChange={handleInput} value={inputs.DOB} />
                  </div>
                  {/* <div>
                    <p className="font-weight">Sex</p>
                    <select className="w-100 mb-4" name="sex" onChange={handleInput} value={inputs.sex}>
                      <option>Please select sex</option>
                      <option>Female</option>
                      <option>Male</option>
                    </select>
                  </div> */}
                  <div>
                    <p className="font-weight">Email</p>
                    <input type="text" className="w-100 mb-4" placeholder="ABC@gmail.com" value={email} readOnly />
                  </div>
                  <div>
                    <p className="font-weight">Address</p>
                    <input type="text" className="w-100 mb-4" name="address" placeholder="abc" onChange={handleInput} value={inputs.address} />
                  </div>
                  <div>
                    <p className="font-weight">Contact number</p>
                    <input type="text" className="w-100 mb-4" placeholder={12345678} name="contact" onChange={handleInput} value={inputs.contact}
                      onKeyPress={(e) => {
                        // Allow only numeric characters
                        const isNumeric = /^[0-9]*$/;
                        if (!isNumeric.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {/* <div className="mb-4">
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight">City</p>
                        <input type="text" className="w-90" />
                      </div>
                      <div className="col-sm-6 mr-55 ">
                        <p className="font-weight">State</p>
                        <input type="text" className="w-100" />
                      </div>
                    </div>
                  </div> */}
                  {renderDegree()}
                  <div className="row mt-5">
                    <div className="col-sm-6 center">
                      <div className="btn-cancel">
                        <button className="btn">Cancel</button>
                      </div>
                    </div>
                    <div className="col-sm-6 center">
                      <div className="btn-save">
                        <button className="btn" onClick={handleSubmit}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-4 red">
                  <Error errors={errors} />
                </div>
              </div>
            </div>
          </div>
          {renderModalRequestBecomeCoach()}
        </div>
      </div>
      {renderModal()}
      {renderModal2()}
      {renderModal3()}
      {renderModal4()}
      {renderModal5()}
      {renderModal6()}
      {renderModal7()}
      {renderModal8()}
    </div>
  )
}