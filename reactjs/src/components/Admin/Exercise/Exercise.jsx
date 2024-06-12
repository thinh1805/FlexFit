import "./Exercise.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import axiosInstance from "../../Axios/axios";
export default function Exercise() {
    const navigate = useNavigate();
    var admin = localStorage.getItem("authAdmin")
    if (admin) {
        admin = JSON.parse(admin);
    }
    const [getTypeExercise, setTypeExercise] = useState([]);
    const [selectedTypeExercise, setSelectedTypeExercise] = useState([]);
    const [ExerciseName, setExerciseName] = useState('');
    const [getDataExercise, setDataExercise] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(7);
    const [getSearchExercise, setSearchExercise] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [inputs, setInputs] = useState({
        exercise_name: "",
        set: "",
        rep: "",
        time_minutes: "",
        calo_kcal: "",
        url: "",
        type_ex:"",
    })


    // Tính toán totalPages
    const totalData = isSearching ? getSearchExercise.length : getDataExercise.length;
    const totalPages = Math.ceil(totalData / perPage);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);
    const [isModalVisible5, setModalVisible5] = useState(false);
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }
    useEffect(() => {
        TypeExercise();
        getInformationExercise();
    }, []);

    // Lấy thông tin chi tiết của exercise
    function getInformationExercise() {
        axiosInstance.get('/exercises/index')
            .then(response => {
                setDataExercise(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // Hiển thị danh sách của TypeExercise
    function TypeExercise() {
        axiosInstance.get('/type_exercises/index')
            .then(response => {
                console.log(response)
                setTypeExercise(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // Hiển thị phần thông tin của exercise
    // function renderInformationExercise() {
    //     const start = (page - 1) * perPage;
    //     const end = start + perPage;
    //     const slicedData = getDataExercise.slice(start, end);

    //     return slicedData.map((value, index) => (
    //         <tr key={index}>
    //             <th scope="row"><input type="checkbox" /></th>
    //             <td>{value.name}</td>
    //             <td>{value.set}</td>
    //             <td>{value.rep}</td>
    //             <td>{value.time_minutes}</td>
    //             <td>{value.calo_kcal}</td>
    //             <td>
    //                 <a><i className="fa-solid fa-gear" /></a>
    //                 <a><i className="fa-solid fa-trash-can" /></a>
    //             </td>
    //         </tr>
    //     ))
    // }
    function renderInformationExercise() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataExercise.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{findTypeExerciseName(value.id_type_ex)}</td>
                <td>{value.name}</td>
                <td>{value.set}</td>
                <td>{value.rep}</td>
                <td>{value.time_minutes}</td>
                <td>{value.calo_kcal}</td>
                <td className="overflow-text"><Link className="link" to={value.url}>{value.url}</Link></td>
                <td>
                    <a><i onClick={() => Delete(
                        value.id
                    )} className="fa-solid fa-trash-can" /></a>
                </td>
            </tr>

        ));
    }
    function Delete(id) {
        axiosInstance.get("/exercises/delete/" + id)
            .then((response) => {
                setDataExercise(data => data.filter(exercise => exercise.id !== id));
                setModalVisible4(true); // Hiển thị modal xóa thành công
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // Hiển thị search
    function renderSearchExercise() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchExercise.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{findTypeExerciseName(value.id_type_ex)}</td>
                <td>{value.name}</td>
                <td>{value.set}</td>
                <td>{value.rep}</td>
                <td>{value.time_minutes}</td>
                <td>{value.calo_kcal}</td>
                <td className="overflow-text"><Link className="link" to={value.url}>{value.url}</Link></td>
                <a><i onClick={() => Delete(
                    value.id
                )} className="fa-solid fa-trash-can" /></a>
            </tr>

        ));
    }

    // Search 
    function handleSearch(e) {
        e.preventDefault();
        axiosInstance.get("/exercises/search", {
            params: {
                name: inputs.name // Truyền tên của bữa ăn vào query parameter
            }
        })
            .then(response => {
                setSearchExercise(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function handleTypeExercise(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        const data = {
            name:inputs.type_ex
        }
        console.log(data )
        if (flag) {
            axiosInstance.post("/type_exercises/create",data)
                .then(response => {
                    console.log(response)
                    TypeExercise();
                })
                .catch(function (error) {
                    console.log(error)
            })
        }
    }
    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
        const totalData = isSearching ? getSearchExercise.length : getDataExercise.length;
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

    const findTypeExerciseName = (id) => {
        const typeExercise = getTypeExercise.find(type => type.id === parseInt(id));
        console.log(typeExercise)
        return typeExercise ? typeExercise.name : 'Unknown';
    };
    // Thêm exercise 
    function handleCreateExercise(e, TypeExercise) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        const selectedTypeExerciseName = TypeExercise.find(type => type.id === parseInt(selectedTypeExercise))?.name;
        console.log(inputs.url)
        // Set the mealName state with the fetched name
        setExerciseName(selectedTypeExerciseName);
        if (inputs.exercise_name === "" || inputs.set === "" || inputs.rep === "" || inputs.calo_kcal === "" || inputs.time_minutes === "" || inputs.url === "" || !selectedTypeExerciseName) {
            setModalVisible3(true);
            return; // Không làm gì nếu không có thời gian được chọn
        }
        if (
            parseInt(inputs.set) < 0 || parseInt(inputs.set) > 100 ||
            parseInt(inputs.rep) < 0 || parseInt(inputs.rep) > 100 ||
            parseInt(inputs.calo_kcal) < 0 || parseInt(inputs.calo_kcal) > 1000 ||
            parseInt(inputs.time_minutes) < 1 || parseInt(inputs.time_minutes) > 100
        ) {
            setModalVisible5(true);
            return; // Stop the execution if validation fails
        }
        if (flag) {
            const data = {
                name: inputs.exercise_name,
                set: inputs.set,
                rep: inputs.rep,
                time_minutes: inputs.time_minutes,
                calo_kcal: inputs.calo_kcal,
                id_type_ex: selectedTypeExercise,
                url: inputs.url.toString()
            }
            let url = '/exercises/create'
            axiosInstance.post(url, data)
                .then(response => {
                    getInformationExercise();
                    setModalVisible2(true);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
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
                                    Add Exercises Successfully
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
                                    Delete Exercise Successfully
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
                                    Input Fields (set,rep,time_minutes,calo_kcal) can only be entered greater than 1 and less than 100)
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
        <div id="addexercise">
            {/* <div class="container mt-5"> */}
            <div className="row padding mt-2">
                <Navbar />
                <div className="col-sm-10">
                    <div className="row search">
                        <form className="col-sm-6 flex" onSubmit={handleSearch}>
                            <div className="search-border">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" placeholder="Search" className="w-80" name="name" required onChange={handleInput} />
                            </div>
                            <button className="btn btn-search">Search</button>
                        </form>
                        <div className="col-sm-4">
                            <div class="center button-add">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#myModal2">
                                    <i class="fa-solid fa-plus"></i> Type Exercise
                                </button>
                            </div>
                            <div className="modal" id="myModal2">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {/* Modal Header */}
                                        {/* Modal body */}
                                        <div className="modal-body mt-3">
                                            <div>
                                                <p className="mb-3 fs-20">Name Type_Ex</p>
                                                <input type="text" className="mb-2 w-80" onChange={handleInput} name="type_ex" />
                                            </div>
                                        </div>
                                        <div className="center mb-4">
                                            <button data-bs-dismiss="modal" className="btn btn-add" onClick={handleTypeExercise}>Add</button>
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
                                        <th scope="col">Type Exercise</th>
                                        <th scope="col">Exercise Name</th>
                                        <th scope="col">Set</th>
                                        <th scope="col">Rep</th>
                                        <th scope="col">Time(Minutes)</th>
                                        <th scope="col">Calo/Kcal</th>
                                        <th scope="col">Youtube</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select value={selectedTypeExercise} onChange={e => setSelectedTypeExercise(e.target.value)}>
                                                <option value="">Select Type</option>
                                                {getTypeExercise.map(type => (
                                                    <option key={type.id} value={type.id}>{type.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="exercise_name" onChange={handleInput} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="set" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="rep" onChange={handleInput}
                                                onKeyPress={(e) => {
                                                    // Allow only numeric characters
                                                    const isNumeric = /^[0-9]*$/;
                                                    if (!isNumeric.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </td>
                                        <td>
                                            <input type="text" className="w-80" name="time_minutes" onChange={handleInput}
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
                                            <input type="url" className="w-80" name="url" onChange={handleInput} />
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleCreateExercise(e, getTypeExercise)} className="btn btn-add">
                                                <i className="fa-solid fa-plus" /> Add
                                            </button>
                                        </td>
                                    </tr>
                                    {isSearching ? renderSearchExercise() : renderInformationExercise()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination mt-3 justify-content-end mb-3">
                        <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                        {renderPageNumbers()}
                        <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataExercise.length < perPage}>Next</button>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal2()}
            {renderModal3()}
            {renderModal4()}
            {renderModal5()}
        </div>
    )
}