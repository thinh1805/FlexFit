import React, { useState } from 'react';
import { Calendar, Badge, Modal, Menu, Dropdown, Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import "./Schedule.css"
import { useNavigate } from 'react-router-dom';
import { Descriptions, Divider } from 'antd';
import { useParams } from 'react-router-dom';
dayjs.locale('vi');

const { confirm } = Modal;

const Schedule = () => {
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
      </div>
    );
  };
  const handleClick = (date, option) => {
    if (option === 'Exercise') {
      // Thực hiện hành động khi người dùng chọn "Add Exercise" cho ngày cụ thể
      // console.log(`Add Exercise clicked for date ${date}`);
      navigate(`/user/mycoach/schedule_exercise?id=${params.id}&date=${date}`);
    } else if (option === 'Meals') {
      // Thực hiện hành động khi người dùng chọn "Add Meals" cho ngày cụ thể
      console.log(`Add Meals clicked for date ${params.id}`);
      navigate(`/user/mycoach/schedulemeal?id=${params.id}&date=${date}`);
    }
  };

  return (
    <div className="container">
      <div className="App">
        <Calendar
          dateCellRender={dateCellRender}
          onSelect={handleDateClick}
          mode="month" // Hiển thị lịch theo tháng
        />
      </div>
    </div>
  );
};

export default Schedule;