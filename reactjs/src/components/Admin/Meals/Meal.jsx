import "./Meal.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import axiosInstance from "../../Axios/axios";

export default function Meal() {
    const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
    const [perPage] = useState(7); // Số bản ghi hiển thị trên mỗi trang
    const navigate = useNavigate();
    const [getTypeMeal, setTypeMeal] = useState([]);
    const [selectedTypeMeal, setSelectedTypeMeal] = useState('');
    const [mealName, setMealName] = useState('');
    const [getDataMeal, setDataMeal] = useState([]);
    const [getSearchMeal, setSearchMeal] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [inputs, setInputs] = useState({
        product_name: "",
        carb: "",
        fiber: "",
        protein: "",
        calo_kcal: "",
        type_meal:"",
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);
    const [isModalVisible5, setModalVisible5] = useState(false);
    const [isModalVisible6, setModalVisible6] = useState(false)
    // Tính toán totalPages
    const totalData = isSearching ? getSearchMeal.length : getDataMeal.length;
    const totalPages = Math.ceil(totalData / perPage);

    useEffect(() => {
        TypeMeal();
        getInformationMeal();
    }, []);

    // Get thông tin meal 
    function getInformationMeal() {
        axiosInstance.get('/meals/index')
            .then(response => {
                setDataMeal(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // Get TypeMeal
    function TypeMeal() {
        axiosInstance.get('/type_meal/index')
            .then(response => {
                setTypeMeal(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Handle input change
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    // Tạo meal 
    function handleCreateMeal(e, typeMeals) {
        e.preventDefault();
        const selectedTypeMealName = typeMeals.find(type => type.id === parseInt(selectedTypeMeal))?.nameType;

        setMealName(selectedTypeMealName);
        console.log(selectedTypeMealName)
        if (inputs.product_name === "" || inputs.carb === "" || inputs.fiber === "" || inputs.protein === "" || inputs.calo_kcal === "" || !selectedTypeMealName) {
            setModalVisible3(true);
            return; // Không làm gì nếu không có thời gian được chọn
        }
        if (
            parseInt(inputs.carb) < 0 || parseInt(inputs.carb) > 100 ||
            parseInt(inputs.fiber) < 0 || parseInt(inputs.fiber) > 100 ||
            parseInt(inputs.calo_kcal) < 0 || parseInt(inputs.calo_kcal) > 1000 ||
            parseInt(inputs.protein) < 0 || parseInt(inputs.protein) > 100
        ) {
            setModalVisible5(true);
            return; // Stop the execution if validation fails
        }
        const data = {
            id_type_meal: selectedTypeMeal,
            name: inputs.product_name,
            carb: inputs.carb,
            fiber: inputs.fiber,
            protein: inputs.protein,
            calo_kcal: inputs.calo_kcal,
        };
        console.log(data)
        axiosInstance.post('/meals/create', data)
            .then(response => {
                getInformationMeal();
                setModalVisible2(true); // Hiển thị modal thành công
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function handleTypeMeal(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        const data = {
            nameType:inputs.type_meal
        }
        console.log(data )
        if (flag) {
            axios.post("http://localhost/BE/public/api/type_meal/create",data)
                .then(response => {
                    console.log(response)
                    TypeMeal();
                })
                .catch(function (error) {
                    console.log(error)
            })
        }
    }
    const findTypeMealName = (id) => {
        const typeMeal = getTypeMeal.find(type => type.id === parseInt(id));
        return typeMeal ? typeMeal.nameType : 'Unknown';
    };

    // Hiển thị dữ liệu thông tin chi tiết về meal 
    function renderInformationMeal() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataMeal.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{findTypeMealName(value.id_type_meal)}</td>
                <td>{value.Name}</td>
                <td>{value.Carb}</td>
                <td>{value.Fiber}</td>
                <td>{value.Protein}</td>
                <td>{value.Calo_kcal}</td>
                <td>
                    <a><i onClick={() => Delete(value.id)} className="fa-solid fa-trash-can" /></a>
                </td>
            </tr>
        ));
    }

    // Hiển thị search
    function renderSearchMeal() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchMeal.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{findTypeMealName(value.id_type_meal)}</td>
                <td>{value.Name}</td>
                <td>{value.Carb}</td>
                <td>{value.Fiber}</td>
                <td>{value.Protein}</td>
                <td>{value.Calo_kcal}</td>
                <td>
                    <a><i onClick={() => Delete(value.id)} className="fa-solid fa-trash-can" /></a>
                </td>
            </tr>
        ));
    }

    function Delete(id) {
        axiosInstance.get("/meals/delete/" + id)
            .then((response) => {
                setDataMeal(data => data.filter(meal => meal.id !== id));
                setModalVisible4(true); // Hiển thị modal xóa thành công
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Search 
    function handleSearch(e) {
        e.preventDefault();
        axiosInstance.get("/meals/search", {
            params: {
                name: inputs.name // Truyền tên của bữa ăn vào query parameter
            }
        })
            .then(response => {
                setSearchMeal(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
        const totalData = isSearching ? getSearchMeal.length : getDataMeal.length;
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

    // Đăng xuất
    function Logout() {
        navigate("/admin/private/login")
        localStorage.clear()
    }

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
                                    End time must be greater than start time
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

    function renderModal2() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible2 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible2 ? 'block' : 'none' }}>
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
                                    Add Meals Successfully
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible2(false);
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

    function renderModal3() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible3 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible3 ? 'block' : 'none' }}>
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
                                    Please select or fill in all information
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible3(false);
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

    function renderModal4() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible4 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible4 ? 'block' : 'none' }}>
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
                                    Delete Meal Successfully
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible4(false);
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
    function renderModal5() {
        return (
            <div>
                {/* Your existing code */}
                {isModalVisible5 && (
                    <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible5 ? 'block' : 'none' }}>
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
                                    Input Fields (fiber,protein,carb,calo_kcal) can only be entered greater than 0 and less than 100)
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            setModalVisible5(false);
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
        <div id="addmeal">
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <form className="col-sm-6 flex" onSubmit={handleSearch}>
                            <div className="search-border">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" placeholder="Search" name="name" className="w-80" onChange={handleInput} required />
                            </div>
                            <button className="btn btn-search">Search</button>
                        </form>
                        <div className="col-sm-4">
                            <div class="center button-add">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#myModal1">
                                    <i class="fa-solid fa-plus"></i> Type Meal
                                </button>
                            </div>
                            <div className="modal" id="myModal1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {/* Modal Header */}
                                        {/* Modal body */}
                                        <div className="modal-body mt-3">
                                            <div>
                                                <p className="mb-3 fs-20">Name Type_Meal</p>
                                                <input type="text" className="mb-2 w-80" onChange={handleInput} name="type_meal"/>
                                            </div>
                                        </div>
                                        <div className="center mb-4">
                                            <button data-bs-dismiss="modal" className="btn btn-add" onClick={handleTypeMeal}>Add</button>
                                            <button data-bs-dismiss="modal" className="btn btn-cancel">Cancel</button>
                                        </div>
                                        {/* Modal footer */}
                                        {/* <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                              </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <button className="btn" onClick={Logout}><i className="fa-solid fa-right-from-bracket"></i></button>
                        </div>
                        <div className="table_user mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Type_meal</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Carb</th>
                                        <th scope="col">Fiber</th>
                                        <th scope="col">Protein</th>
                                        <th scope="col">Calo/Kcal</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select value={selectedTypeMeal} onChange={e => setSelectedTypeMeal(e.target.value)}>
                                                <option value="">Select Type</option>
                                                {getTypeMeal.map(type => (
                                                    <option key={type.id} value={type.id}>{type.nameType}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="product_name" onChange={handleInput} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="carb" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="fiber" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="protein" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="calo_kcal" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleCreateMeal(e, getTypeMeal)} className="btn btn-addMeal">
                                                <i className="fa-solid fa-plus" /> Add
                                            </button>
                                        </td>
                                    </tr>

                                    {isSearching ? renderSearchMeal() : renderInformationMeal()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataMeal.length < perPage}>Next</button>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal2()}
            {renderModal3()}
            {renderModal4()}
            {renderModal5()}

        </div>
    );
}
