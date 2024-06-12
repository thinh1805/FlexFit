import { Link, useNavigate } from "react-router-dom"
import "./Payment.css";
import Navbar from "../../layout/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../Axios/axios";

export default function Payment() {
    const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
    const [perPage] = useState(7); // Số bản ghi hiển thị trên mỗi trang
    const navigate = useNavigate();
    const [getDataPayment, setDataPayment] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [getSearchPayment, setSearchPayment] = useState([]);
    const totalData = isSearching ? getSearchPayment.length : getDataPayment.length;
    const totalPages = Math.ceil(totalData / perPage);
    function Logout() {
        navigate("/admin/private/login")
        localStorage.clear()
    }
    useEffect(() => {
        getInformationPayment();
    }, []);

    // Get thông tin meal 
    function getInformationPayment() {
        axiosInstance.get('/getListInvoices')
            .then(response => {
                console.log(response.data)
                setDataPayment(response.data.invoices)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    function renderInformationPayment() {
        if (getDataPayment.length === 0) {
            return <tr><td colSpan="9">No payment data available.</td></tr>;
        }else{
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const slicedData = getDataPayment.slice(start, end);
            return slicedData.map((value, index) => (
                <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.total_money}</td>
                    <td>{value.id_user}</td>
                    <td>{value.name}</td>
                    <td>{value.phone}</td>
                    <td>{formatDate(value.created_at)}</td>
                    <td>{formatDate(value.updated_at)}</td>
                    <td className="green"><i className="fa-solid fa-check" /></td>
                    <td><i className="fa-solid fa-trash-can" /></td>
                    {/* <td>
                        <a><i onClick={() => Delete(value.id)} className="fa-solid fa-trash-can" /></a>
                    </td> */}
                </tr>
            ));
        }
    }
    const nextPage = () => {
        const totalData = isSearching ? getSearchPayment.length : getDataPayment.length;
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

    return (
        <div id="payment">
            {/* <div class="container mt-5"> */}
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <div className="col-sm-11 flex">
                            <div className="search-border">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" placeholder="Search" className="w-80" />
                            </div>
                            <button className="btn btn-search">Search</button>
                        </div>
                        <div className="col-sm-1">
                            <button className="btn" onClick={Logout}><i className="fa-solid fa-right-from-bracket"></i></button>
                        </div>
                        <div className="table_user mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Invoice ID</th>
                                        <th scope="col">Total money</th>
                                        <th scope="col">UserID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Updated At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderInformationPayment()}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination mt-3 justify-content-end mb-3">
                            <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                            {renderPageNumbers()}
                            <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataPayment.length < perPage}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}