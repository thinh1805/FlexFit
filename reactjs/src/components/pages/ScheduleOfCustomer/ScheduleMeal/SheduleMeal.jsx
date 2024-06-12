// import React, { useState, useEffect, useRef } from "react";
// import "./ScheduleMeal.css";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// export default function ScheduleMeal() {
//     // Sử dụng useState để lưu trữ trạng thái của biểu tượng (cộng hoặc trừ)
//     const [expanded, setExpanded] = useState(false);
//     const contentRef = useRef(null);
//     const [getDataMealForDate, setDataMealForDate] = useState([]);
//     // Hàm để thay đổi trạng thái của biểu tượng khi được bấm
//     const toggleIcon = () => {
//         setExpanded(!expanded);
//     };
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const date = searchParams.get('date');
//     const id_coach = searchParams.get('id');
//     const user = JSON.parse(localStorage.getItem("authcustomer"));
//     const token = user?.data?.auth_token;
//     const id_user = user?.data?.auth?.id;

//     const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//     };
//     useEffect(() => {
//         if (contentRef.current) {
//             if (expanded) {
//                 contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
//             } else {
//                 contentRef.current.style.height = '0';
//             }
//         }
//         getInformationMealForDate();
//     }, [expanded]);
//     function getInformationMealForDate() {
//         console.log(id_coach);
//         axios.get('http://localhost/BE/public/api/schedules/date', {
//             params: {
//                 date: date,
//                 id_coach: id_coach,
//             },
//             headers: config.headers
//         })
//             .then(response => {
//                 setDataMealForDate(response.data.schedules);
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//     function renderScheduleMeal() {
//         const mealData = getDataMealForDate.filter(item => item.id_meals !== null);; // Lọc ra các dữ liệu có id_exercise là null
//         return mealData.map((value, index) => (
//             <div className="col-sm-12 flex">
//                 <div className="col-sm-3 center">
//                     <p>{value.name}</p>
//                 </div>
//                 <div className="col-sm-3 center">
//                     <p>{value.describe}</p>
//                 </div>
//                 <div className="col-sm-3 center">
//                      <p>{value.time_end}</p>               
//                 </div>
//                 <div className="col-sm-3 center">
//                     <button className="btn btn-submit">Submit</button>
//                 </div>
//             </div>
//         ));
//     }
//     return (
//         <div id="ScheduleMeal">
//             <div className="container">
//                 <div className="row">
//                     <div className="border-information mb-5">
//                         <p className="mt-3 fs-20" onClick={toggleIcon}>
//                             {expanded ? (
//                                 <i className="fa-solid fa-minus ms-4 red"></i>
//                             ) : (
//                                 <i className="fa-solid fa-plus ms-4 red"></i>
//                             )}
//                             <span className="ms-3">Schedule Today</span>
//                         </p>
//                     </div>
//                     <div
//                         className={`padding-information mb-5 ${expanded ? 'expanded' : ''}`}
//                         ref={contentRef}
//                     >
//                         <div className="row">
//                             <div className="col-sm-12 mb-4 flex">
//                                 <div className="col-sm-3 center">
//                                     <h6 className="mb-5">Product Name</h6>
//                                 </div>
//                                 <div className="col-sm-3 center">
//                                     <h6 className="mb-5">Describe</h6>
//                                 </div>
//                                 <div className="col-sm-3 center">
//                                     <h6 className="mb-5">Time_end</h6>
//                                 </div>
//                                 <div className="col-sm-3 center">
//                                     <h6 className="mb-5">Action</h6>
//                                 </div>
//                             </div>
//                             {renderScheduleMeal()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from "react";
import "./ScheduleMeal.css";
import axiosInstance from "../../../Axios/axios";
import { useLocation } from "react-router-dom";

export default function ScheduleMeal() {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef(null);
    const [getDataMealForDate, setDataMealForDate] = useState([]);
    const [submittedMeals, setSubmittedMeals] = useState(new Set());
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const id_coach = searchParams.get('id');
    const user = JSON.parse(localStorage.getItem("authcustomer"));
    const token = user?.data?.auth_token;
    const id_user = user?.data?.auth?.id;
    const [inputs, setInput] = useState({
        comment: "",
    })
    const [isModalVisible, setModalVisible] = useState(false);
    
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    const toggleIcon = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            if (expanded) {
                contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
            } else {
                contentRef.current.style.height = '0';
            }
        }
        getInformationMealForDate();
    }, [expanded]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkAndSubmit();
            
        }, 300000); // Kiểm tra 5 phút/lần
        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, [getDataMealForDate, submittedMeals]);
    const handleInput = (e ,mealId) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput(prevInputs => ({ ...prevInputs, [mealId]: { ...prevInputs[mealId], [nameInput]: value } }));
    }
    const getInformationMealForDate = () => {
        axiosInstance.get('/schedules/date', {
            params: { date, id_coach },
            headers: config.headers
        })
        .then(response => {
            setDataMealForDate(response.data.schedules);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const checkAndSubmit = () => {
        // const now = new Date();
        // getDataMealForDate.forEach(value => {
        //     if (submittedMeals.has(value.id_meals)) return; // Nếu đã submit, bỏ qua

        //     const mealTime = new Date(value.time_end);
        //     if (now >= mealTime) {
        //         submitMeal(value.id_meals);
        //     }
        // });
    };

    // const submitMeal = (mealId) => {
    //     axios.post('http://localhost/BE/public/api/submit', { id_meal: mealId }, config)
    //     .then(response => {
    //         console.log(response.data);
    //         setSubmittedMeals(prev => new Set([...prev, mealId])); // Đánh dấu đã submit
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // };
    const isCommentEmpty = (comment) => {
        return comment === "" || comment === null;
    };
    function submitMeal(id) {
        console.log(id)

        const data = {
            status: true,
            describe: inputs[id] ? inputs[id].comment : ""
        }
        console.log(data)
        // setModalVisible(false)
        axiosInstance.post(`/schedule/${id}`, data, config)
            .then(response => {
                console.log(response)
                setModalVisible(true)
                setSubmittedMeals(prev => new Set([...prev, id])); // Mark as submitted
            })
            .catch(error => {
                console.error(error);
            });
    }
    const renderScheduleMeal = () => {
        const mealData = getDataMealForDate.filter(item => item.id_meals !== null);
        console.log(mealData)
        return mealData.map((value, index) => (
            <div className="col-sm-12 flex" key={index}>
                <div className="col-sm-3 center">
                    <p>{value.name}</p>
                </div>
                <div className="col-sm-3 center">
                    <p>{100*value.weight} gram</p>
                </div>
                <div className="col-sm-3 center">
                <input
                    className="mb-3 input-comment-meal"
                    type="text"
                    name="comment"
                    placeholder="Your comment"
                    value={inputs[value.id] ? inputs[value.id].comment || "" : ""}
                    onChange={(e) => handleInput(e, value.id)}
                />
                </div>
                <div className="col-sm-3 center">
                    {/* <button
                        className="btn btn-submit"
                        onClick={() => submitMeal(value.id_meals)}
                        disabled={submittedMeals.has(value.id_meals)}
                    >
                        {submittedMeals.has(value.id_meals) ? "Submitted" : "Submit"}
                    </button> */}
                    <button className="btn btn-submit" onClick={() => submitMeal(value.id)} disabled={!isCommentEmpty(value.describe)}>Submit</button>
                </div>
            </div>
        ));
    };
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
                                    Submitted Successfully
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
    return (
        <div id="ScheduleMeal">
            <div className="container">
                <div className="row">
                    <div className="border-information mb-5">
                        <p className="mt-3 fs-20" onClick={toggleIcon}>
                            {expanded ? (
                                <i className="fa-solid fa-minus ms-4 red"></i>
                            ) : (
                                <i className="fa-solid fa-plus ms-4 red"></i>
                            )}
                            <span className="ms-3">Schedule Today</span>
                        </p>
                    </div>
                    <div
                        className={`padding-information mb-5 ${expanded ? 'expanded' : ''}`}
                        ref={contentRef}
                    >
                        <div className="row">
                            <div className="col-sm-12 mb-4 flex">
                                <div className="col-sm-3 center">
                                    <h6 className="mb-5">Product Name</h6>
                                </div>
                                <div className="col-sm-3 center">
                                    <h6 className="mb-5">Weight</h6>
                                </div>
                                <div className="col-sm-3 center">
                                    <h6 className="mb-5">Comment</h6>
                                </div>
                                <div className="col-sm-3 center">
                                    <h6 className="mb-5">Action</h6>
                                </div>
                            </div>
                            {renderScheduleMeal()}
                        </div>
                    </div>
                </div>
                {renderModal()}
            </div>
        </div>
    );
}