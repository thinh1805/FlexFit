import "./AddMeal.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import axiosInstance from "../../Axios/axios";
export default function AddMealOfCoach() {
    const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
    const [perPage] = useState(7); // Số bản ghi hiển thị trên mỗi trang
    const [getMeal, setMeal] = useState([]);
    const [selectedTypeMeal, setSelectedTypeMeal] = useState('');
    const [mealName, setMealName] = useState('');
    const [getDataMealForDate, setDataMealForDate] = useState([]);
    const [getSearchMeal, setSearchMeal] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        describe: "",
        quantity: ""
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
    const [carb, setCarb] = useState('');
    const [fiber, setFiber] = useState('');
    const [protein, setProtein] = useState('');
    const [calo_kcal, setCaloKcal] = useState('');
    const [weight, setWeight] = useState("")
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    // Tính toán totalPages
    const totalData = isSearching ? getSearchMeal.length : getDataMealForDate.length;
    const totalPages = Math.ceil(totalData / perPage);
    const handleSelectChange = (e) => {
        setSelectedTypeMeal(e.target.value);
    }
    useEffect(() => {
        if (selectedTypeMeal) {
            const selectedMeal = getMeal.find(meal => meal.id === parseInt(selectedTypeMeal));
            if (selectedMeal) {
                setCarb(selectedMeal.Carb);
                setFiber(selectedMeal.Fiber);
                setProtein(selectedMeal.Protein)
                setCaloKcal(selectedMeal.Calo_kcal);
                setWeight(100)
                // Cập nhật các thuộc tính khác tương tự ở đây
            }
        } else {
            setCarb('');
            setFiber('');
            setProtein('');
            setCaloKcal('');
            // Đặt các thuộc tính khác về giá trị mặc định ở đây
        }
        Meal();
        getInformationMealForDate();
    }, [selectedTypeMeal]);

    // Get thông tin meal 
    function getInformationMealForDate() {
        axiosInstance.get('/schedules/date', {
            params: {
                date: date,
                id_user: id_user,
            },
            headers: config.headers
        })
            .then(response => {
                setDataMealForDate(response.data.schedules);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Get TypeMeal
    function Meal() {
        axiosInstance.get('/meals/index')
            .then(response => {
                setMeal(response.data);
                console.log(response)
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
    function handleCreateMeal(e, Meals) {
        e.preventDefault();
        const selectedMealName = Meals.find(type => type.id === parseInt(selectedTypeMeal))?.Name;

        setMealName(selectedMealName);

        if (!selectedMealName || inputs.quantity === "") {
            setModalVisible3(true)
            return; // Không làm gì nếu không có thời gian được chọn
        }

        const quantity = parseInt(inputs.quantity);
        if (quantity < 1 || quantity > 10) {
            setModalVisible5(true); // Hiển thị modal thông báo trọng lượng không hợp lệ
            return;
        }

        const data = {
            id_meals: selectedTypeMeal,
            name: selectedMealName,
            id_owner: id_coach,
            id_user: id_user,
            date: date,
            // time_start: startTime,
            // time_end: endTime,
            weight: inputs.quantity,
        };
        axiosInstance.post('/schedule/create', data, config)
            .then(response => {
                getInformationMealForDate();
                setModalVisible2(true)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const findTypeMeal = (id) => {
        return getMeal.find(type => type.id === parseInt(id));
    };
    // Hiển thị dữ liệu thông tin chi tiết về meal 
    function renderInformationMealForDate() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getDataMealForDate.slice(start, end);
        const mealData = slicedData.filter(item => item.id_meals !== null);

        return mealData.map((value, index) => {
            const meal = findTypeMeal(value.id_meals);
            return (
                <tr key={index}>
                    <td>{value.name}</td>
                    <td>{meal?.Carb * value.weight || '0'}</td>
                    <td>{meal?.Fiber * value.weight || '0'}</td>
                    <td>{meal?.Protein * value.weight || '0'}</td>
                    <td>{meal?.Calo_kcal * value.weight || '0'}</td>
                    <td>{value.weight}</td>
                    <td>{100 * value.weight}</td>
                    <td>
                        <a onClick={() => deleteMeal(value.id)}>
                            <i className="fa-solid fa-trash-can" />
                        </a>
                    </td>
                </tr>
            );
        });
    }

    // Hiển thị search
    function renderSearchMeal() {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const slicedData = getSearchMeal.slice(start, end);

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
                setSearchMeal(response.data);
                setIsSearching(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Điều hướng đến trang tiếp theo
    const nextPage = () => {
        const totalData = isSearching ? getSearchMeal.length : getDataMealForDate.length;
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
    function deleteMeal(id) {
        axiosInstance.get("/schedule/delete/" + id, config)
            .then((response) => {
                setDataMealForDate(data => data.filter(meal => meal.id !== id));
                setModalVisible4(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div id="addmealofcoach">
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
                                            <th scope="col">Meal</th>
                                            <th scope="col">Carb</th>
                                            <th scope="col">Fiber</th>
                                            <th scope="col">Protein</th>
                                            <th scope="col">Calo/Kcal</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Weight</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {/* <select value={selectedTypeMeal} onChange={e => setSelectedTypeMeal(e.target.value)}>
                                                    <option value="">Select Type</option>
                                                    {getMeal.map(type => (
                                                        <option key={type.id} value={type.id}>{type.Name}</option>
                                                    ))}
                                                </select> */}
                                                <select value={selectedTypeMeal} onChange={handleSelectChange}>
                                                    <option value="">Select Type</option>
                                                    {getMeal.map(type => (
                                                        <option key={type.id} value={type.id}>{type.Name}</option>
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
                                            <td>{carb}</td>
                                            <td>{fiber}</td>
                                            <td>{protein}</td>
                                            <td>{calo_kcal}</td>
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
                                            <td>{weight}</td>
                                            <td>
                                                <button onClick={(e) => handleCreateMeal(e, getMeal)} className="btn btn-add">
                                                    <i className="fa-solid fa-plus" /> Add
                                                </button>
                                            </td>
                                        </tr>
                                        {renderInformationMealForDate()}
                                        {/* {isSearching ? renderSearchMeal() : renderInformationMeal() } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="pagination mt-3 justify-content-end mb-5">
                            <button onClick={prevPage} className="btn btn-prev" disabled={page === 1}>Prev</button>
                            {renderPageNumbers()}
                            <button onClick={nextPage} className={`btn-next btn ${page === totalPages ? 'disabled' : ''}`} disabled={page === totalPages || getDataMealForDate.length < perPage}>Next</button>
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
