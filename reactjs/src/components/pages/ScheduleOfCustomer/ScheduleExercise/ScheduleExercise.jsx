// import React, { useState, useEffect, useRef } from "react";
// import "./ScheduleExercise.css";
// import ReactPlayer from 'react-player'
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// export default function ScheduleExercise() {
//     const [expanded, setExpanded] = useState(false);
//     const contentRef = useRef(null);
//     const [getDataExerciseForDate, setDataExerciseForDate] = useState([]);
//     const [getDataExercise, setDataExercise] = useState([]);
//     const [submittedExercises, setSubmittedExercises] = useState(new Set());
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const date = searchParams.get('date');
//     const id_coach = searchParams.get('id');
//     const user = JSON.parse(localStorage.getItem("authcustomer"));
//     const token = user?.data?.auth_token;

//     const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//     };

//     const toggleIcon = () => {
//         setExpanded(!expanded);
//     };

//     useEffect(() => {
//         if (contentRef.current) {
//             if (expanded) {
//                 contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
//             } else {
//                 contentRef.current.style.height = '0';
//             }
//         }
//         getInformationExerciseForDate();
//     }, [expanded]);

//     useEffect(() => {
//         getInformationExercise();
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             checkAndSubmit();
//         }, 300000); // Check every 5 minutes
//         return () => clearInterval(interval); // Clear interval on component unmount
//     }, [getDataExerciseForDate, submittedExercises]);

//     const getInformationExercise = () => {
//         axios.get('http://localhost/BE/public/api/exercises/index')
//             .then(response => {
//                 setDataExercise(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };

//     const getInformationExerciseForDate = () => {
//         axios.get('http://localhost/BE/public/api/schedules/date', {
//             params: { date, id_coach },
//             headers: config.headers
//         })
//             .then(response => {
//                 setDataExerciseForDate(response.data.schedules);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };

//     const checkAndSubmit = () => {
//         // Implement your checkAndSubmit logic here
//     };

//     const submitExercise = (exerciseId) => {
//         axios.post('http://localhost/BE/public/api/submit', { id_exercise: exerciseId }, config)
//             .then(response => {
//                 console.log(response.data);
//                 setSubmittedExercises(prev => new Set([...prev, exerciseId])); // Mark as submitted
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };

//     const findTypeExerciseUrl = (id) => {
//         const urlExercise = getDataExercise.find(type => type.id === parseInt(id));
//         return urlExercise ? urlExercise.url : 'Unknown';
//     };

//     const renderScheduleExercise = () => {
//         const exerciseData = getDataExerciseForDate.filter(item => item.id_exercises !== null);
//         return exerciseData.map((value, index) => (
//             <div className="col-sm-12" key={index}>
//                 <div className="col-sm-12 center">
//                     <ReactPlayer
//                         className="thinh"
//                         controls={true}
//                         url={findTypeExerciseUrl(value.id_exercises)}
//                         height="700"
//                         width="500"
//                     />
//                 </div>
//                 <div className="col-sm-12 center">
//                     <button
//                         className="btn btn-submit"
//                         onClick={() => submitExercise(value.id_exercises)}
//                         disabled={submittedExercises.has(value.id_exercises)}
//                     >
//                         {submittedExercises.has(value.id_exercises) ? "Submitted" : "Submit"}
//                     </button>
//                 </div>
//             </div>
//         ));
//     };
//     const renderName = () =>{
//         const exerciseData = getDataExerciseForDate.filter(item => item.id_exercises !== null);
//         return exerciseData.map((value, index) => (
//             <span className="ms-3">{value.name}</span>
//         ));
//     }
//     return (
//         <div id="ScheduleExercise">
//             <div className="container">
//                 <div className="row">
//                     <div className="border-information mb-5">
//                         <p className="mt-3 fs-20" onClick={toggleIcon}>
//                             {expanded ? (
//                                 <i className="fa-solid fa-minus ms-4 red"></i>
//                             ) : (
//                                 <i className="fa-solid fa-plus ms-4 red"></i>
//                             )}
//                             {renderName()}
//                         </p>
//                     </div>
//                     <div
//                         className={`padding-information mb-5 ${expanded ? 'expanded' : ''}`}
//                         ref={contentRef}
//                     >
//                         <div className="row">
//                             {renderScheduleExercise()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from "react";
import "./ScheduleExercise.css";
import ReactPlayer from 'react-player';
import axiosInstance from "../../../Axios/axios";
import { useLocation } from "react-router-dom";

export default function ScheduleExercise() {
    const [expandedStates, setExpandedStates] = useState([]);
    const [getDataExerciseForDate, setDataExerciseForDate] = useState([]);
    const [getDataExercise, setDataExercise] = useState([]);
    const [submittedExercises, setSubmittedExercises] = useState(new Set());
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [inputs, setInputs] = useState({ comment: "" });
    const [getId_exercise, setId_exercise] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const id_coach = searchParams.get('id');
    const user = JSON.parse(localStorage.getItem("authcustomer"));
    const token = user?.data?.auth_token;
    const [getComment , setComment] = useState("")
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    useEffect(() => {
        getInformationExerciseForDate();
    }, []);

    useEffect(() => {
        getInformationExercise();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkAndSubmit();
        }, 300000); // Check every 5 minutes
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [getDataExerciseForDate, submittedExercises]);

    const getInformationExercise = () => {
        axiosInstance.get('/exercises/index')
            .then(response => {
                setDataExercise(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const isCommentEmpty = (comment) => {
        return comment === "" || comment === null;
    };
    const getInformationExerciseForDate = () => {
        axiosInstance.get('/schedules/date', {
            params: { date, id_coach },
            headers: config.headers
        })
            .then(response => {
                const schedules = response.data.schedules;
                
                setDataExerciseForDate(schedules);
                setExpandedStates(new Array(schedules.length).fill(false)); // Initialize expanded states
            })
            .catch(error => {
                console.error(error);
            });
    };

    const checkAndSubmit = () => {
        // Implement your checkAndSubmit logic here
    };

    const submitExercise = (id) => {
        const data = {
            status: true,
            describe: inputs.comment
        };
        axiosInstance.post(`/schedule/${id}`, data, config)
            .then(response => {
                console.log(response);
                setSubmittedExercises(prev => new Set([...prev, id])); // Mark as submitted
                setModalVisible(false);
                setModalVisible1(true);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmit = (id) => {
        setId_exercise(id);
        setModalVisible(true);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs(state => ({ ...state, [name]: value }));
    };

    const findTypeExerciseUrl = (id) => {
        const urlExercise = getDataExercise.find(type => type.id === parseInt(id));
        return urlExercise ? urlExercise.url : 'Unknown';
    };

    const toggleIcon = (index) => {
        setExpandedStates(prevStates => prevStates.map((state, i) => i === index ? !state : state));
    };

    const renderNames = () => {
        const exerciseData = getDataExerciseForDate.filter(item => item.id_exercises !== null);
        return exerciseData.map((value, index) => (
            <div className="border-information mb-5" key={index}>
                <p className="mt-3 fs-20" onClick={() => toggleIcon(index)}>
                    {expandedStates[index] ? (
                        <i className="fa-solid fa-minus ms-4 red"></i>
                    ) : (
                        <i className="fa-solid fa-plus ms-4 red"></i>
                    )}
                    <span className="ms-3">{value.name}</span>
                </p>
                {expandedStates[index] && (
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-12 center">
                                <ReactPlayer
                                    className="thinh"
                                    controls={true}
                                    url={findTypeExerciseUrl(value.id_exercises)}
                                    height="700"
                                    width="500"
                                />
                            </div>
                            <div className="col-sm-12 center">
                                <button
                                    className="btn btn-submit"
                                    onClick={() => handleSubmit(value.id)}
                                    disabled={!isCommentEmpty(value.describe)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ));
    };

    const renderModal = () => (
        isModalVisible && (
            <div className="modal modal-notification mb-4" id="myModal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content modal-createPost">
                        <div className="modal-header mb-2">
                            <h4 className="modal-title white">Notification</h4>
                        </div>
                        <div className="modal-body mb-2">
                            <input
                                className="mb-3 input-comment"
                                type="text"
                                name="comment"
                                placeholder="Your comment"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn"
                                data-bs-dismiss="modal"
                                onClick={() => submitExercise(getId_exercise)}
                                
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    const renderModal1 = () => (
        isModalVisible1 && (
            <div className="modal modal-notification mb-4" id="myModal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content modal-createPost">
                        <div className="modal-header mb-2">
                            <h4 className="modal-title white">Notification</h4>
                        </div>
                        <div className="modal-body mb-2">
                            Submitted Successfully
                        </div>
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
        )
    );

    return (
        <div id="ScheduleExercise">
            <div className="container">
                <div className="row">
                    {renderNames()}
                </div>
            </div>
            {renderModal()}
            {renderModal1()}
        </div>
    );
}