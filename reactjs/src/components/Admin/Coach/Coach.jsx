import Navbar from "../../layout/Navbar/Navbar"
import "./Coach.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function Coach() {
    const navigate = useNavigate();
    // phần khai báo 
    var admin = localStorage.getItem("authAdmin")
    if (admin) {
        admin = JSON.parse(admin);
    }
    const [getDataCoach, setDataCoach] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [isSearching, setIsSearching] = useState(false);
    const [getSearchCoach, setSearchCoach] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
    })
    const totalData = isSearching ? getSearchCoach.length : getDataCoach.length;
    const totalPages = Math.ceil(totalData / perPage);
    useEffect(() => {
        getInformationCoach();
    }, []);

    // lấy thông tin dữ liệu của coach
    function getInformationCoach() {
        axiosInstance.get('/getDataCoach')
            .then(response => {
                setDataCoach(response.data.coach)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    
    // hiển thị thông tin chi tiết của coach
    function renderInformationCoach() {
        
        if (Object.keys(getDataCoach).length > 0) {
            return getDataCoach.map((value) => {
                return (
                    <tr>
                        
                        <td>{value.id}</td>
                        <td>{value.DOB}</td>
                        <td className="overflow-text">{value.name}</td>
                        <td>{value.email}</td>
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
                            {value.degree ? (
                                <img src={`http://localhost/BE/public/${value.degree}`} width="30px" height="30px" onClick={() => openImageModal(value.degree)} style={{ cursor: 'pointer' }}></img>
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            <i onClick={() => Delete(
                                value.id
                            )}
                            class="fa-solid fa-ban"></i>
                        </td>
                    </tr>
                )
            })
        }
    }
    function renderSearchCoach() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchCoach.slice(start, end);

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
                    <i onClick={() => Delete(
                        value.id
                    )}
                        class="fa-solid fa-ban"></i>
                </td>
            </tr>
        ));
    }
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
                setSearchCoach(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const openImageModal = (image) => {
        setCurrentImage(image);
    }
    const closeImageModal = () => {
        setCurrentImage(null);
    }
    // xoá coach
    function Delete(id) {
        axiosInstance.post("/destroy/" + id)
            .then((response) => {
                setDataCoach(data => data.filter(coach => coach.id !== id));
            })
    }
    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
        const totalData = isSearching ? getSearchCoach.length : getDataCoach.length;
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
        <div id="coach">
            {/* <div class="container mt-5"> */}
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <form className="col-sm-11 flex" onSubmit={handleSearch} >
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
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isSearching ? renderSearchCoach() : renderInformationCoach()}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataCoach.length < perPage}>Next</button>
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