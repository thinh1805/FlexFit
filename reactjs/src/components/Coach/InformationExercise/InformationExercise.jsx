import React, { useState, useEffect, useRef } from "react";
import "./InformationExercise.css"
import ReactPlayer from 'react-player';

import { useLocation } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function InformationExercise() {
    const [expandedStates, setExpandedStates] = useState([]);
    const [getDataExerciseForDate, setDataExerciseForDate] = useState([]);
    const [getDataExercise, setDataExercise] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const id_user = searchParams.get('id');
    const coach = JSON.parse(localStorage.getItem("authcoach"));
    const token = coach?.data?.auth_token;
    const id_coach = coach?.data?.auth?.id;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    useEffect(() => {
        getInformationExerciseForDate();
        getInformationExercise();
    }, []);


    const getInformationExercise = () => {
        axiosInstance.get('/exercises/index')
            .then(response => {
                setDataExercise(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getInformationExerciseForDate = () => {
        axiosInstance.get('/schedules/date', {
            params: { date, id_coach, id_user },
            headers: config.headers
        })
            .then(response => {
                console.log(response)
                const schedules = response.data.schedules;
                setDataExerciseForDate(schedules);
                setExpandedStates(new Array(schedules.length).fill(false)); // Initialize expanded states
            })
            .catch(error => {
                console.error(error);
            });
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
                    {value.status === "Processed" && (
                        <i className="fa fa-check checkstatus" aria-hidden="true"></i>
                    )}
                </p>
                {expandedStates[index] && (
                    <div className="row">
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
                            <h5 className="mb-4">Comment</h5>
                            <p>{value.describe}</p>
                        </div>
                    </div>
                )}
            </div>
        ));
    };


    return (
        <div id="InformationExercise">
            <div className="container">
                <div className="row">
                    {renderNames()}
                </div>
            </div>
        </div>
    );
}