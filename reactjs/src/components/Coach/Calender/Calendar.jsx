// import React, { useState, useEffect } from 'react';
// import { Badge, Calendar, Spin, Modal, Descriptions, Divider, Button } from 'antd';
// import dayjs from 'dayjs';
// import 'dayjs/locale/vi';
// dayjs.locale('vi');

// const currentDate = new Date();
// const formattedDate = currentDate.toLocaleDateString('en-GB');
// const currentDay = formattedDate.split('/')[0];
// const currentMonth = formattedDate.split('/')[1];
// const currentYear = formattedDate.split('/')[2];

// const OwnerBookScheduled = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [scheduleDetail, setScheduleDetail] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(currentDay);
//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [datesHaveEvent, setDatesHaveEvent] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDetailLoading, setIsDetailLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
//   const [addMealsModalOpen, setAddMealsModalOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setIsLoading(true);
//         // const { data } = await api.post('/owner/get-schedule-in-month', {
//         //   month: `${selectedMonth}/01/${selectedYear}`
//         // });
//         // setSchedule(data.schedule);
//         // setDatesHaveEvent([...new Set(data.schedule.map((val) => val.date))]);
//       } catch (error) {
//         console.log(error);
//         setSchedule([]);
//       }
//       setIsLoading(false);
//     })();
//   }, [selectedMonth, selectedYear]);

//   useEffect(() => {
//     if (isModalOpen) {
//       getScheduleInDate();
//     }
//   }, [isModalOpen]);

//   const getScheduleInDate = async () => {
//     try {
//     //   const { data } = await api.post('/owner/get-schedule-in-date', {
//     //     date: `${selectedMonth}/${selectedDay}/${selectedYear}`
//     //   });
//     //   setScheduleDetail(data.schedule);
//     } catch (error) {
//       console.log(error);
//     }
//     setIsDetailLoading(false);
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const showAddExerciseModal = () => {
//     setAddExerciseModalOpen(true);
//   };

//   const showAddMealsModal = () => {
//     setAddMealsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//     setAddExerciseModalOpen(false);
//     setAddMealsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setAddExerciseModalOpen(false);
//     setAddMealsModalOpen(false);
//   };

//   const getListData = (value) => {
//     let listData;

//     const selectedSchedules = schedule.filter((val) => {
//       const day = +val.date.split('-')[2];
//       const month = +val.date.split('-')[1];
//       const year = +val.date.split('-')[0];

//       if (
//         day === value.date() &&
//         month === value.month() + 1 &&
//         year === value.year()
//       )
//         return true;
//     });

//     listData = selectedSchedules.map((val) => ({
//       type: 'success',
//       content: val.name_pitch
//     }));

//     return listData || [];
//   };

//   const dateCellRender = (value) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender = (current, info) => {
//     if (info.type === 'date') return dateCellRender(current);
//     return info.originNode;
//   };

//   const handleSelect = (value, { source }) => {
//     const formattedMonth =
//       value.$M + 1 < 10 ? '0' + (value.$M + 1) : value.$M + 1;
//     const formattedDay = value.$D < 10 ? '0' + value.$D : value.$D;

//     if (
//       datesHaveEvent.includes(
//         `${value.$y}-${formattedMonth}-${formattedDay}`
//       ) &&
//       source === 'date'
//     ) {
//       showModal();
//       setIsDetailLoading(true);
//     }
//     setSelectedDay(value.$D);
//     setSelectedMonth(value.$M + 1);
//     setSelectedYear(value.$y);

//     // Mở cả hai modal khi nhấn vào bất kỳ ngày nào
//     showAddExerciseModal();
//     showAddMealsModal();
//   };

//   const renderItemForDetailShedule = (item) => {
//     // return [
//     //   {
//     //     key: '1',
//     //     label: 'Tên sân bóng',
//     //     children: <p>{item.name_pitch}</p>
//     //   },
//     //   {
//     //     key: '2',
//     //     label: 'Địa chỉ',
//     //     children: (
//     //       <p>{`${item.address}, ${item.name_ward}, ${item.name_district}, TP. Đà Nẵng`}</p>
//     //     )
//     //   },
//     //   {
//     //     key: '3',
//     //     label: 'Giờ bắt đầu',
//     //     children: <p>{item.time_start.slice(0, -3)}</p>
//     //   },
//     //   {
//     //     key: '4',
//     //     label: 'Giờ kết thúc',
//     //     children: <p>{item.time_end.slice(0, -3)}</p>
//     //   }
//     // ];
//   };

//   return (
//     <div>
//       <Modal
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={[]}
//       >
//         <h2
//           style={{
//             marginBottom: '20px',
//             marginLeft: '4px',
//             fontWeight: 'normal'
//           }}
//         >{`${selectedDay}/${selectedMonth}/${selectedYear}`}</h2>
//         {isDetailLoading ? (
//           <div
//             style={{
//               height: '100px',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center'
//             }}
//           >
//             <Spin />
//           </div>
//         ) : (
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {scheduleDetail.map((val, idx) => {
//               return (
//                 <>
//                   <Descriptions
//                     items={renderItemForDetailShedule(val)}
//                     column={2}
//                   />
//                   {idx !== scheduleDetail.length - 1 && (
//                     <Divider style={{ margin: 0, marginBottom: '20px' }} />
//                   )}
//                 </>
//               );
//             })}
//           </div>
//         )}
//         <Button onClick={showAddExerciseModal}>Add Exercise</Button>
//         <Button onClick={showAddMealsModal}>Add Meals</Button>
//       </Modal>

//       {addExerciseModalOpen && (
//         <Modal
//           visible={addExerciseModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//         >
//           {/* Content for Add Exercise */}
//         </Modal>
//       )}

//       {addMealsModalOpen && (
//         <Modal
//           visible={addMealsModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//         >
//           {/* Content for Add Meals */}
//         </Modal>
//       )}

//       {isLoading && (
//         <div
//           style={{
//             width: '100%',
//             height: '77vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 10,
//             position: 'absolute',
//             background: 'white'
//           }}
//         >
//           <Spin />
//         </div>
//       )}
//       <div style={{ background: '#ffffff', height: '77vh' }}>
//         <Calendar
//           cellRender={cellRender}
//           mode="month"
//           onSelect={(value, source) => handleSelect(value, source)}
//         />
//       </div>
//     </div>
//   );
// };

// export default OwnerBookScheduled;

// import React, { useState } from 'react';
// import { Calendar, Badge, Modal, Menu, Dropdown, Button } from 'antd';
// import dayjs from 'dayjs';
// import 'dayjs/locale/vi';

// import { Descriptions, Divider } from 'antd';
// dayjs.locale('vi');

// const { confirm } = Modal;


// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [menuVisible, setMenuVisible] = useState({}); // State để kiểm soát hiển thị của khung dropmenu cho từng ngày

//   const handleDateClick = value => {
//     const selectedDate = value.format('YYYY-MM-DD');
//     // const selectedEvents = eventsData[selectedDate] || [];
//     // setEvents(selectedEvents);

//     // Hiển thị ngay khi bấm vào ô lịch
//     setMenuVisible(prevState => ({
//       ...prevState,
//       [selectedDate]: true
//     }));
//   };

//   const dateCellRender = value => {
//     const date = value.format('YYYY-MM-DD');
//     // const events = eventsData[date];
//     return (
//       <div>
//         <ul className="events">
//           {events &&
//             events.map((event, index) => (
//               <li key={index}>
//                 <Badge status="success" text={event.content} />
//               </li>
//             ))}
//         </ul>
//         {/* Dropmenu cho từng ngày */}
//         <Dropdown
//           overlay={(
//             <Menu>
//               <Menu.Item key="addExercise">
//                 <Button onClick={() => handleMenuClick(date, 'addExercise')}>Add Exercise</Button>
//               </Menu.Item>
//               <Menu.Item key="addMeals">
//                 <Button onClick={() => handleMenuClick(date, 'addMeals')}>Add Meals</Button>
//               </Menu.Item>
//             </Menu>
//           )}
//           visible={menuVisible[date]}
//           onVisibleChange={visible => setMenuVisible(prevState => ({...prevState, [date]: visible}))}
//           trigger={['click']}
//         >
//           <Button>{value.format('D MMM YYYY')}</Button>
//         </Dropdown>
//       </div>
//     );
//   };



//   const handleMenuClick = (date, option) => {
//     if (option === 'addExercise') {
//       // Thực hiện hành động khi người dùng chọn "Add Exercise" cho ngày cụ thể
//       console.log(`Add Exercise clicked for date ${date}`);
//     } else if (option === 'addMeals') {
//       // Thực hiện hành động khi người dùng chọn "Add Meals" cho ngày cụ thể
//       console.log(`Add Meals clicked for date ${date}`);
//     }
//     // Ẩn khung dropmenu sau khi người dùng chọn một tùy chọn
//     setMenuVisible(prevState => ({...prevState, [date]: false}));
//   };

//   return (
//     <div className="App">
//       <Calendar
//         dateCellRender={dateCellRender}
//         onSelect={handleDateClick}
//       />



//     </div>
//   );
// };

// export default App;






import React, { useState } from 'react';
import { Calendar, Badge, Modal, Menu, Dropdown, Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import "./Calendar.css"
import { useNavigate } from 'react-router-dom';
import { Descriptions, Divider } from 'antd';
import { useParams } from 'react-router-dom';
dayjs.locale('vi');

const { confirm } = Modal;

const App = () => {
  const [events, setEvents] = useState([]);
  const params = useParams();
  console.log(params.id)
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null); // Ngày đang được chọn

  const handleDateClick = value => {
    const date = value.format('YYYY-MM-DD');
    setSelectedDate(prevDate => (prevDate === date ? null : date)); // Đảo ngược trạng thái của selectedDate
  };

  const dateCellRender = value => {
    const date = value.format('YYYY-MM-DD');
    const isPastDate = dayjs(date).isBefore(dayjs(), 'day');
    function renderButton() {
      if (isPastDate) {
        return (
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item key="addExercise">
                  <Button className="btn-addExercise" onClick={() => handleClick(date, 'Exercise')}>Exercise</Button>
                </Menu.Item>
                <Menu.Item key="addMeals">
                  <Button className="btn-addMeal" onClick={() => handleClick(date, 'Meals')}>Meals</Button>
                </Menu.Item>
              </Menu>
            )}
            visible={selectedDate === date}
            onVisibleChange={visible => {
              if (!visible) setSelectedDate(null); // Ẩn dropdown khi visible là false
            }}
            trigger={['click']}
          >
            <div></div>
          </Dropdown>
        )
      } else {
        return (
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item key="addExercise">
                  <Button className="btn-addExercise" onClick={() => handleMenuClick(date, 'addExercise')}>Add Exercise</Button>
                </Menu.Item>
                <Menu.Item key="addMeals">
                  <Button className="btn-addMeal" onClick={() => handleMenuClick(date, 'addMeals')}>Add Meals</Button>
                </Menu.Item>
              </Menu>
            )}
            visible={selectedDate === date}
            onVisibleChange={visible => {
              if (!visible) setSelectedDate(null); // Ẩn dropdown khi visible là false
            }}
            trigger={['click']}
          >
            <div></div>
          </Dropdown>
        )
      }
    }
    return (
      <div>
        <ul className="events">
          {events &&
            events.map((event, index) => (
              <li key={index}>
                <Badge status="success" text={event.content} />
              </li>
            ))}
        </ul>
        {/* Dropmenu cho từng ngày */}
        {renderButton()}
      </div>
    );
  };

  const handleMenuClick = (date, option) => {
    if (option === 'addExercise') {
      // Thực hiện hành động khi người dùng chọn "Add Exercise" cho ngày cụ thể
      console.log(`Add Exercise clicked for date ${date}`);
      navigate(`/coach/addexercise?id=${params.id}&date=${date}`);
    } else if (option === 'addMeals') {
      // Thực hiện hành động khi người dùng chọn "Add Meals" cho ngày cụ thể
      console.log(`Add Meals clicked for date ${date}`);
      navigate(`/coach/addmeal?id=${params.id}&date=${date}`);
    }
  };
  const handleClick = (date, option) => {
    if (option === 'Exercise') {
      // Thực hiện hành động khi người dùng chọn "Add Exercise" cho ngày cụ thể
      // console.log(`Add Exercise clicked for date ${date}`);
      navigate(`/coach/manageCoach/InformationExercise?id=${params.id}&date=${date}`);
    } else if (option === 'Meals') {
      // Thực hiện hành động khi người dùng chọn "Add Meals" cho ngày cụ thể
      // console.log(`Add Meals clicked for date ${date}`);
      navigate(`/coach/manageCoach/InformationMeal?id=${params.id}&date=${date}`);
    }
  };

  return (
    <div className="App">
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={handleDateClick}
        mode="month" // Hiển thị lịch theo tháng
      />
    </div>
  );
};

export default App;




// import React, { useState } from 'react';
// import { Calendar, Badge, Dropdown, Menu, Button } from 'antd';
// import dayjs from 'dayjs';
// import 'dayjs/locale/vi';
// import './Calendar.css';
// import { useNavigate, useParams } from 'react-router-dom';

// dayjs.locale('vi');

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const params = useParams();
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null); // Ngày đang được chọn

//   const handleDateClick = value => {
//     const date = value.format('YYYY-MM-DD');
//     setSelectedDate(prevDate => (prevDate === date ? null : date)); // Đảo ngược trạng thái của selectedDate
//   };

//   // Hàm kiểm tra ngày có phải là ngày trước ngày hiện tại không
//   const isBeforeToday = date => {
//     return dayjs(date).isBefore(dayjs(), 'date');
//   };

//   const dateCellRender = value => {
//     const date = value.format('YYYY-MM-DD');
//     const isBefore = isBeforeToday(date); // Kiểm tra xem ngày có phải là trước ngày hiện tại không

//     return (
//       <div className={isBefore ? 'before-today' : ''}>
//         <ul className="events">
//           {events &&
//             events.map((event, index) => (
//               <li key={index}>
//                 <Badge status="success" text={event.content} />
//               </li>
//             ))}
//         </ul>
//         {/* Dropmenu cho từng ngày */}
//         <Dropdown
//           overlay={(
//             <Menu>
//               <Menu.Item key="addExercise">
//                 <Button className="btn-addExercise" onClick={() => handleMenuClick(date, 'addExercise')}>Exercise</Button>
//               </Menu.Item>
//               <Menu.Item key="addMeals">
//                 <Button className="btn-addMeal" onClick={() => handleMenuClick(date, 'addMeals')}>Meal</Button>
//               </Menu.Item>
//             </Menu>
//           )}
//           visible={selectedDate === date}
//           onVisibleChange={visible => {
//             if (!visible) setSelectedDate(null); // Ẩn dropdown khi visible là false
//           }}
//           trigger={['click']}
//         >
//           <div></div>
//         </Dropdown>
//       </div>
//     );
//   };

//   const handleMenuClick = (date, option) => {
//     if (option === 'addExercise') {
//       // Thực hiện hành động khi người dùng chọn "Exercise" cho ngày cụ thể
//       console.log(`Exercise clicked for date ${date}`);
//     } else if (option === 'addMeals') {
//       // Thực hiện hành động khi người dùng chọn "Meal" cho ngày cụ thể
//       console.log(`Meal clicked for date ${date}`);
//       navigate(`/coach/addmeal?id=${params.id}&date=${date}`);
//     }
//   };
//   return (
//     <div className="App">
//       <Calendar
//         dateCellRender={dateCellRender}
//         onSelect={handleDateClick}
//         mode="month" // Hiển thị lịch theo tháng
//       />
//     </div>
//   );
// };

// export default App;