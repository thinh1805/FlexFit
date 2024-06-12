import { Link } from "react-router-dom";
import "./User.css";
import Navbar from "../../layout/Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function User() {
    var admin = localStorage.getItem("authAdmin")
    if (admin) {
        admin = JSON.parse(admin);
    }
    const [getDataUser, setDataUser] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const [getSearchUser, setSearchUser] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
    })
    const [currentImage, setCurrentImage] = useState(null);
    // Tính toán totalPages
    const totalData = isSearching ? getSearchUser.length : getDataUser.length;
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
    const openImageModal = (image) => {
        setCurrentImage(image);
    }
    const closeImageModal = () => {
        setCurrentImage(null);
    }
    // lấy dữ liệu của user 
    function getInformationUser() {
        axiosInstance.get('/getDataCustomer')
            .then(response => {
                setDataUser(response.data.customer)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Hiển thị dữ liệu của user 
    function renderInformationUser() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataUser.slice(start, end);
        if (Object.keys(slicedData).length > 0) {
            return slicedData.map((value) => {
                return (
                    <tr>
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
                )
            })
        }
    }

    // Hàm xoá coach 
    function Delete(id) {
        axiosInstance.post("/destroy/" + id)
            .then((response) => {
                setDataUser(data => data.filter(user => user.id !== id));
            })
    }

    function renderSearchUser() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchUser.slice(start, end);

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

    // Search 
    function handleSearch(e) {
        e.preventDefault();
        axiosInstance.get("/customer/search", {
            params: {
                name: inputs.name // Truyền tên của bữa ăn vào query parameter
            }
        })
            .then(response => {
                setSearchUser(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
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
    // Đăng xuất
    function Logout() {
        navigate("/admin/private/login")
        localStorage.clear()
    }
    return (
        <div id="user">
            {/* <div class="container mt-5"> */}
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <form className="col-sm-11 flex" onSubmit={handleSearch}>
                            <div className="search-border">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" placeholder="Search" className="w-80" name="name" required onChange={handleInput} />
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
                                        <th scope="col">Invoice ID</th>
                                        <th scope="col">DOB</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isSearching ? renderSearchUser() : renderInformationUser()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataUser.length < perPage}>Next</button>
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