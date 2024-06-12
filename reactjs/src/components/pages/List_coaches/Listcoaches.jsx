import { useContext, useEffect, useState } from "react";
import "./Listcoaches.css"
import { TokenContext } from "../../Token/Token";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function Listcoaches() {
    const navigate = useNavigate();
    const getUser = useContext(TokenContext);
    const [token, setToken] = useState(getUser.storedTokenCustomer.data.auth_token);
    const [getCoach, setCoach] = useState('');
    const [id_user, setId_user] = useState(getUser.storedTokenCustomer.data.auth.id)
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const [page, setPage] = useState(1);
    const [perPage] = useState(2);
    const totalData =   getCoach.length;
    const totalPages = Math.ceil(totalData / perPage);
    useEffect(() => {
        getInformationListCoach();
    }, []);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    function getInformationListCoach() {
        axiosInstance.get('/getCoach', config)
            .then(response => {
                console.log(response)
                setCoach(response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function renderInformationCoach() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getCoach.slice(start, end);

        if (Array.isArray(getCoach) && getCoach.length > 0) {
        return slicedData.map((value, index) => (
                        <div className="row list_coaches_detail mb-3">
                            <div className="col-sm-3">
                                <img src={`http://localhost:8080/BE/public${value.image}`} alt={8888} />
                            </div>
                            <div className="col-sm-9 list_coaches_padding">
                                <div className="flex mb-3 list_coaches_star">
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <p className="point">5.0</p>
                                </div>
                                <p className="list_coaches_name">{value.name}</p>
                                <div className="list_coaches_padding list_coaches_items">
                                    <p className="list_coaches_location"><i className="fa-solid fa-location-dot" /> <span>{value.address}</span></p>
                                    <p className="list_coaches_birth"><i className="fa-solid fa-calendar-days" /><span>{value.DOB}</span></p>
                                    <p className="list_coaches_experience"><i class="fa-solid fa-phone" /><span>{value.phone}</span></p>
                                </div>
                                <div className="ta-end">
                                    <button className="btn" onClick={() => postRequestHireCoach(value.id)}>Hire</button>
                                </div>
                            </div>
                        </div>
                ));
            }
    }
    function postRequestHireCoach(id_coach) {
        axiosInstance.get(`/getCoachById/${id_coach}/sendRequest`, config)
            .then((response) => {
                setModalVisible(true)
            })
            .catch(function (error) {
                setModalVisible1(true)
            })
    }
    const nextPage = () => {
        const totalData =  getCoach.length;
        const totalPages = Math.ceil(totalData / perPage);

        if (page < totalPages) {
            setPage(page + 1);
        } else {
            // Nếu đang ở trang cuối cùng, setPage sẽ được set lại là totalPages để giống với nút Prev
            setPage(totalPages);
        }
    }

    // Điều hướng đến trang trước đó
    const prevPage = () => {
        setPage(page - 1);
    }
    // Hàm để tạo một mảng chứa số trang
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

    // Hiển thị nút số trang
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
    function renderModal() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-4">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-3">
                                    Please pay otherwise the request will not appear on the coach
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible(false);
                                            navigate("/user/paypal")
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
                                <div className="modal-header mb-4">
                                    <h4 className="modal-title white">
                                        Notification
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-3">
                                    Limited to 1 person only. Thank you for using the website
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
    return (
        <div id="list_coaches">
            <div className="container">
                <div className="center">
                    <h2>List Coaches</h2>
                </div>
                <div className="row">
                    <div className="col-sm-4 padding mt-3 mb-5">
                        <div className="list_coaches_search flex">
                            <input type="text" className="w-90" placeholder="Tìm Kiếm" />
                            <button className="btn">
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                        </div>
                        <div className="border-bt mt-3" />
                        <div className="rating mt-3">
                            <p className="rating_title mbt-0 mb-1">Đánh giá</p>
                            <div className="rating_star">
                                <div className="rating_star_flex">
                                    <input type="checkbox" className="mt-2" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <div className="rating_star_flex">
                                    <input type="checkbox" className="mt-2" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <div className="rating_star_flex">
                                    <input type="checkbox" className="mt-2" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <div className="rating_star_flex">
                                    <input type="checkbox" className="mt-2" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <div className="rating_star_flex">
                                    <input type="checkbox" className="mt-2" />
                                    <i className="fa-solid fa-star" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 list_coaches_container mt-3 mb-5">
                        {renderInformationCoach()}
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getCoach.length < perPage}>Next</button>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal1()}
        </div>
    )
}
