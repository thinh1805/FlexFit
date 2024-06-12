
import "./InformationMeal.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function ScheduleMeal() {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef(null);
    const [getDataMealForDate, setDataMealForDate] = useState([]);
    const [submittedMeals, setSubmittedMeals] = useState(new Set());
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
    const getInformationMealForDate = () => {
        axiosInstance.get('/schedules/date', {
            params: { date, id_coach ,id_user},
            headers: config.headers
        })
            .then(response => {
                console.log(response)
                setDataMealForDate(response.data.schedules);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const renderScheduleMeal = () => {
        const mealData = getDataMealForDate.filter(item => item.id_meals !== null);
        console.log(mealData)
        return mealData.map((value, index) => (
            <div className="col-sm-12 flex" key={index}>
                <div className="col-sm-4 center">
                    <p>{value.name}</p>
                </div>
                <div className="col-sm-4 center">
                    <p>{100*value.weight} gram</p>
                </div>
                <div className="col-sm-4 center">
                    <p>{value.describe}</p>
                </div>
                {/* <div className="col-sm-3 center">
                    <button
                        className="btn btn-submit"
                        onClick={() => submitMeal(value.id_meals)}
                        disabled={submittedMeals.has(value.id_meals)}
                    >
                        {submittedMeals.has(value.id_meals) ? "Submitted" : "Submit"}
                    </button>
                    <button className="btn btn-submit" onClick={() => submitMeal(value.id)}>Submit</button>
                </div> */}
            </div>
        ));
    };

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
                            <span className="ms-3">Submit Of Customer Today</span>
                        </p>
                    </div>
                    <div
                        className={`padding-information mb-5 ${expanded ? 'expanded' : ''}`}
                        ref={contentRef}
                    >
                        <div className="row">
                            <div className="col-sm-12 mb-4 flex">
                                <div className="col-sm-4 center">
                                    <h6 className="mb-5">Product Name</h6>
                                </div>
                                <div className="col-sm-4 center">
                                    <h6 className="mb-5">Weight</h6>
                                </div>                          
                                <div className="col-sm-4 center">
                                    <h6 className="mb-5">Comment</h6>
                                </div>
                            </div>
                            {renderScheduleMeal()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}