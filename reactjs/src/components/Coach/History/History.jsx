import { useEffect, useState } from "react";
import axiosInstance from "../../Axios/axios";
import { useParams } from "react-router-dom";
import './History.css';

export default function History() {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
    const perPage = 7; // Số bản ghi hiển thị trên mỗi trang
    const params = useParams();
    var coach = localStorage.getItem("authcoach");
    if (coach) {
        coach = JSON.parse(coach);
        var token = coach.data.auth_token;
    }
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    useEffect(() => {
        getHistory();
    }, []); // Empty dependency array ensures this runs only once when component mounts

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function getHistory() {
        axiosInstance.get(`/getHistory/${params.id}`, config)
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setHistory(response.data.data);
                } else {
                    setHistory([]); // Đảm bảo `history` là một mảng
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const totalData = history.length;
    const totalPages = Math.ceil(totalData / perPage);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        if (page > 1) {
            pageNumbers.push(page - 1);
        }
        pageNumbers.push(page);
        if (page < totalPages) {
            pageNumbers.push(page + 1);
        }
        return pageNumbers;
    };

    const renderPageNumbers = () => {
        const pageNumbers = generatePageNumbers();
        return pageNumbers.map(number => (
            <button
                key={number}
                className={`btn ${number === page ? 'btn-active' : ''}`}
                onClick={() => setPage(number)}
            >
                {number}
            </button>
        ));
    };

    function renderInformationHistory() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = history.slice(start, end);
        console.log(history)
        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{formatDate(value.created_at)}</td>
                <td>{value.height}</td>
                <td>{value.ankle}</td>
                <td>{value.knee}</td>
                <td>{value.neck}</td>
                <td>{value.chest}</td>
                <td>{value.abdomen}</td>
                <td>{value.hip}</td>
                <td>{value.thigh}</td>
                <td>{value.biceps}</td>
                <td>{value.forearm}</td>
                <td>{value.wrist}</td>
            </tr>
        ));
    }

    return (
        <div id="addmealofcoach">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row search">
                            <div className="table_user mt-4">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Height</th>
                                            <th scope="col">Ankle</th>
                                            <th scope="col">Knee</th>
                                            <th scope="col">Neck</th>
                                            <th scope="col">Chest</th>
                                            <th scope="col">Abdomen</th>
                                            <th scope="col">Hip</th>
                                            <th scope="col">Thigh</th>
                                            <th scope="col">Biceps</th>
                                            <th scope="col">Forearm</th>
                                            <th scope="col">Wrist</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderInformationHistory()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="pagination mt-3 justify-content-end mb-5">
                            <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                            {renderPageNumbers()}
                            <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || history.length < perPage}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}