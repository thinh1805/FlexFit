import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Approve.css"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";

export default function Approve() {
    const [page, setPage] = useState(1);
    const [perPage] = useState(4);
    const [getDataBecomeCoach, setDataBecomeCoach] = useState('');
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [getSearchBecomeCoach, setSearchBecomeCoach] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
    })
    const totalData = isSearching ? getSearchBecomeCoach.length : getDataBecomeCoach.length;
    const totalPages = Math.ceil(totalData / perPage);
    useEffect(() => {
        getInformationUser();
    }, []);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }
    // Search 
    function handleSearch(e) {
        e.preventDefault();
        axiosInstance.get("/coach/search", {
            params: {
                name: inputs.name // Truyền tên của bữa ăn vào query parameter
            }
        })
            .then(response => {
                setSearchBecomeCoach(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function getInformationUser() {
        axiosInstance.get('/degree/index')
            .then(response => {
                setDataBecomeCoach(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function renderSearchBecomeCoach() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchBecomeCoach.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{value.id}</td>
                <td>{value.DOB}</td>
                <td>{value.name}</td>
                <td className="overflow-text">{value.email}</td>
                <td>{value.sex}</td>
                <td>{value.phone}</td>
                <td>
                    {value.image ? (
                        <img src={`http://localhost/BE/public/${value.image}`} width="30px" height="30px" onClick={() => openImageModal(value.image)} style={{ cursor: 'pointer' }}></img>
                    ) : (
                        ""
                    )}
                </td>
                <td>
                    <i class="fa-solid fa-ban"></i>
                </td>
            </tr>
        ));
    }
    function cancel(id_degree,id_user) {
        const data = {
            id_degree:id_degree,
            id_user:id_user
        }
        axiosInstance.post("/cancelDegree",data)
            .then((response) => {
                setDataBecomeCoach(data => data.map(degree => {
                    if (degree.degree_id === id_degree) {
                        return { ...degree, status: 'Cancel' }; // Cập nhật trạng thái thành 'Cancel'
                    }
                    return degree;
                }));
            })
    }
    function approve(id_degree, id_user) {
        const data = {
            id_degree:id_degree,
            id_user:id_user
        }
        axiosInstance.post("/acceptDegree" , data)
            .then((response) => {
                setDataBecomeCoach(data => data.map(degree => {
                    if (degree.degree_id === id_degree) {
                        return { ...degree, status: 'Processed' }; // Cập nhật trạng thái thành 'Cancel'
                    }
                    return degree;
                }));
                
            })
    }
    function renderInformationBecomeCoach() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataBecomeCoach.slice(start, end);
        if (Object.keys(slicedData).length > 0) {
            return slicedData.map((value) => {
                return (
                    <tr>
                        <td>{value.degree_id}</td>
                        <td>{value.DOB}</td>
                        <td>{value.name}</td>
                        <td className="overflow-text">{value.email}</td>
                        <td>{value.sex}</td>
                        <td>{value.phone}</td>
                        <td>
                            {value.image ? (
                                <img src={`http://localhost/BE/public/${value.image}`} width="30px" height="30px" onClick={() => openImageModal(value.image)} style={{ cursor: 'pointer' }}></img>
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            {value.degree_image ? (
                                <img src={`http://localhost/BE/public/${value.degree_image}`} width="30px" height="30px" onClick={() => openImageModal(value.degree_image)} style={{ cursor: 'pointer' }}></img>
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            {value.status === 'Cancel' ? (
                                <span>
                                    <i className="fa-solid fa-ban"></i> 
                                </span>
                            ) : (
                                value.status
                            )}
                        </td>
                        <td>
                            {value.status !== 'Cancel' && value.status !== 'Processed' && (
                                <i className="fa-solid fa-check" onClick={() => approve(value.degree_id , value.user_id)}></i>
                            )}
                        </td>
                        <td>
                            {value.status !== 'Cancel' && value.status !== 'Processed' && (
                                <i onClick={() => cancel(value.degree_id,value.user_id)}
                                    className="fa-solid fa-ban"></i>
                            )}
                        </td>
                    </tr>
                )
            })
        }
    }
    const openImageModal = (image) => {
        setCurrentImage(image);
    }
    const closeImageModal = () => {
        setCurrentImage(null);
    }
    const nextPage = () => {
        const totalData = isSearching ? getSearchBecomeCoach.length : getDataBecomeCoach.length;
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
    function Logout() {
        navigate("/admin/private/login")
        localStorage.clear()
    }
    return (
        <div id="Approve">
            {/* <div class="container mt-5"> */}
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <form className="col-sm-11 flex" onSubmit={handleSearch}>
                            <div className="search-border">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" placeholder="Search" className="w-80" name="name" required onChange={handleInput}/>
                            </div>
                            <button className="btn btn-search">Search</button>
                        </form>
                        <div className="col-sm-1">
                            <button className="btn" onClick={Logout}><i className="fa-solid fa-right-from-bracket"></i></button>
                        </div>
                        <div className="table_user mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">DOB</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Degree</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Approve</th>
                                        <th scope="col">Refuse</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isSearching ? renderSearchBecomeCoach() : renderInformationBecomeCoach()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataBecomeCoach.length < perPage}>Next</button>
                    </div>
                </div>
            </div>
            {currentImage && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={`http://localhost/BE/public/${currentImage}`} style={{ maxWidth: '90%', maxHeight: '90%' }} />
                    <button className="btn btn-exit" onClick={closeImageModal} style={{ position: 'absolute', top: 20, right: 20, fontSize: '25px', color: 'white' }}>×</button>
                </div>
            )}
        </div>
    )
}
