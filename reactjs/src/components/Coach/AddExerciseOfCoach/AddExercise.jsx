import "./AddExercise.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
export default function AddExerciseOfCoach() {
    const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
    const [perPage] = useState(7); // Số bản ghi hiển thị trên mỗi trang
    const [getExercise, setExercise] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [mealName, setExerciseName] = useState('');
    const [getDataExerciseForDate, setDataExerciseForDate] = useState([]);
    const [getSearchExercise, setSearchExercise] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        quantity: "",
    })
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);
    const [isModalVisible5, setModalVisible5] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const id_user = searchParams.get('id');
    const coach = JSON.parse(localStorage.getItem("authcoach"));
    const token = coach?.data?.auth_token;
    const id_coach = coach?.data?.auth?.id;
    const [rep, setRep] = useState('');
    const [set,setSet ] = useState('');
    const [time_minutes, setTime_minutes] = useState('');
    const [calo_kcal, setCaloKcal] = useState('');
    const [youtube, setYoutube] = useState('');
    const [weight ,setWeight] = useState('')
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    // Tính toán totalPages
    const totalData = isSearching ? getSearchExercise.length : getDataExerciseForDate.length;
    const totalPages = Math.ceil(totalData / perPage);
    const handleSelectChange = (e) => {
        setSelectedExercise(e.target.value);
    }
    useEffect(() => {
        if (selectedExercise) {
            const selectedEx = getExercise.find(ex => ex.id === parseInt(selectedExercise));
            if (selectedEx) {
                setRep(selectedEx.rep);
                setSet(selectedEx.set);
                setTime_minutes(selectedEx.time_minutes);
                setCaloKcal(selectedEx.calo_kcal)
                setYoutube(selectedEx.url)
                setWeight(100)
                // Cập nhật các thuộc tính khác tương tự ở đây
            }
        } else {
            setRep('')
            setSet('')
            setTime_minutes('')
            setCaloKcal('')
            setYoutube('')
            // Đặt các thuộc tính khác về giá trị mặc định ở đây
        }
        Exercise();
        getInformationExerciseForDate();
    }, [selectedExercise]);

    // Get thông tin meal 
    function getInformationExerciseForDate() {
        axiosInstance.get('/schedules/date', {
            params: {
                date: date,
                id_user: id_user,
            },
            headers: config.headers
        })
            .then(response => {
                setDataExerciseForDate(response.data.schedules);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Get TypeMeal
    function Exercise() {
        axiosInstance.get('/exercises/index')
            .then(response => {
                console.log(response)
                setExercise(response.data);
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
    const handleStartTimeChange = (e) => {
        const startTime = e.target.value;
        // Xử lý giá trị startTime ở đây (ví dụ: lưu vào state hoặc thực hiện các thao tác khác)
    }
    const getCurrentTime = () => {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0'); // Lấy giờ hiện tại, có thể thêm xử lý để định dạng như mong muốn
        const currentMinute = now.getMinutes().toString().padStart(2, '0'); // Lấy phút hiện tại
        return `${currentHour}:${currentMinute}`;
    }
    // Tạo meal 
    function handleCreateExercise(e, Exercises) {
        e.preventDefault();
        const selectedExerciseName = Exercises.find(type => type.id === parseInt(selectedExercise))?.name;

        setExerciseName(selectedExerciseName);
        
        if (!selectedExerciseName) {
            setModalVisible3(true)
            return; // Không làm gì nếu không có thời gian được chọn
        }
        
        const quantity = parseInt(inputs.quantity);
        console.log(quantity)
        if (quantity < 1 || quantity > 10) {
            setModalVisible5(true); 
            return;
        }
        const data = {
            id_exercises: selectedExercise,
            name: selectedExerciseName,
            id_owner: id_coach,
            id_user: id_user,
            date: date,
            // time_start: startTime,
            // time_end: endTime,
            weight: inputs.quantity
        };
        axiosInstance.post('/schedule/create', data, config)
            .then(response => {
                getInformationExerciseForDate();
                setModalVisible2(true)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const findTypeExercise = (id) => {
        return getExercise.find(type => type.id === parseInt(id));
    };
    // Hiển thị dữ liệu thông tin chi tiết về meal 
    function renderInformationExerciseForDate() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataExerciseForDate.slice(start, end);
        const exerciseData = slicedData.filter(item => item.id_exercises !== null);; // Lọc ra các dữ liệu có id_exercise là null
        return exerciseData.map((value, index) => {
            const exercise = findTypeExercise(value.id_exercises);
            console.log(exercise)
            return (
                <tr key={index}>
                    <td>{value.name}</td>
                    <td>{exercise?.rep * value.weight|| '0'}</td>
                    <td>{exercise?.set * value.weight|| '0'}</td>
                    <td>{exercise?.time_minutes || '0'}</td>
                    <td>{exercise?.calo_kcal * value.weight || '0'}</td>
                    <td>{100*value.weight}</td>
                    <td>{value.weight}</td>
                    <td className="overflow-text"><Link className="link" to={exercise?.url || ''}>{exercise?.url || ''}</Link></td>
                    <td>
                        <a onClick={() => deleteExercise(
                            value.id
                        )}>
                            <i className="fa-solid fa-trash-can" /></a>
                    </td>
                </tr>
            );
        });
    }
    function edit(id, name, time_start, time_end, describe) {
        const data = {
            id: id,
            name: name,
            time_start: time_start,
            time_end: time_end,
            describe: describe
        }
        console.log(data)
    }
    function deleteExercise(id) {
        axiosInstance.get("/schedule/delete/" + id, config)
            .then((response) => {
                setDataExerciseForDate(data => data.filter(exercise => exercise.id !== id));
                setModalVisible4(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // Hiển thị search
    function renderSearchMeal() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchExercise.slice(start, end);

        return slicedData.map((value, index) => (
            <tr key={index}>
                <td>{value.name}</td>
                <td>{value.time_start}</td>
                <td>{value.time_end}</td>
                <td>
                    <a><i className="fa-solid fa-gear" /></a>
                    <a><i className="fa-solid fa-trash-can" /></a>
                </td>
            </tr>
        ));
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
                console.log(response.data)
                setSearchExercise(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
        const totalData = isSearching ? getSearchExercise.length : getDataExerciseForDate.length;
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
                                    The quantity is only greater than 1 and less than 10
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
        <div id="addexerciseofcoach">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row search">
                            {/* <form className="col-sm-11 flex">
                                <div className="search-border" onSubmit={handleSearch}>
                                    <i className="fa-solid fa-magnifying-glass" />
                                    <input type="text" placeholder="Search" name="name" className="w-80" onChange={handleInput} required />
                                </div>
                                <button className="btn btn-search">Search</button>
                            </form> */}
                            <div className="table_user mt-4">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Rep</th>
                                            <th scope="col">Set</th>
                                            <th scope="col">Time_minutes</th>
                                            <th scope="col">Calo/Kcal</th>
                                            <th scope="col">Weight</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Youtube</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <select value={selectedExercise} onChange={handleSelectChange}>
                                                    <option value="">Select Type</option>
                                                    {getExercise.map(type => (
                                                        <option key={type.id} value={type.id}>{type.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            {/* <td>
                                                <input
                                                    id="time_start"
                                                    type="time"
                                                    min={getCurrentTime()} // Đặt giá trị tối thiểu là giờ hiện tại
                                                    onChange={handleStartTimeChange} // Xử lý sự kiện thay đổi giá trị của input
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    id="time_end"
                                                    type="time"
                                                    min={getCurrentTime()} // Đặt giá trị tối thiểu là giờ hiện tại
                                                    onChange={handleStartTimeChange} // Xử lý sự kiện thay đổi giá trị của input
                                                />
                                            </td> */}
                                            <td>{rep}</td>
                                            <td>{set}</td>
                                            <td>{time_minutes}</td>
                                            <td>{calo_kcal}</td>
                                            <td>{weight}</td>
                                            <td>
                                                <input type="text" className="w-80" name="quantity" onChange={handleInput}
                                                    onKeyPress={(e) => {
                                                        // Allow only numeric characters
                                                        const isNumeric = /^[0-9]*$/;
                                                        if (!isNumeric.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }} />
                                            </td>
                                            
                                            <td className="overflow-text"><Link className="link" to={youtube}>{youtube}</Link></td>
                                            <td>
                                                <button onClick={(e) => handleCreateExercise(e, getExercise)} className="btn btn-add">
                                                    <i className="fa-solid fa-plus" /> Add
                                                </button>
                                            </td>
                                        </tr>
                                        {renderInformationExerciseForDate()}
                                        {/* {isSearching ? renderSearchMeal() : renderInformationMeal() } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="pagination mt-3 justify-content-end mb-5">
                            <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                            {renderPageNumbers()}
                            <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataExerciseForDate.length < perPage}>Next</button>
                        </div>
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
