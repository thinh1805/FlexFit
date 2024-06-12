import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


// users
import Home from './components/pages/Homepage/Home';
import Introduce from './components/pages/Homepage/Introduce/Introduce';
import Contact from './components/pages/Homepage/Contact/Contact';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Listcoaches from './components/pages/List_coaches/Listcoaches';
import ChangePassword from './components/pages/Information/Changepassword/Changepassword';
import EditInformation from './components/pages/Information/EditInformation';
import DisableAccount from './components/pages/Information/DisableAccount/DisableAccount';
import ScheduleMeal from './components/pages/ScheduleOfCustomer/ScheduleMeal/SheduleMeal';
import ScheduleExercise from './components/pages/ScheduleOfCustomer/ScheduleExercise/ScheduleExercise';
import Invoices from './components/pages/MyInvoices/Invoices';

//admin
import LoginAdmin from './components/Admin/Login/LoginAdmin';
import Meal from './components/Admin/Meals/Meal';
import Exercise from './components/Admin/Exercise/Exercise';
import User from './components/Admin/User/User';
import Payment from './components/Admin/Payment/Payment';
import Coach from './components/Admin/Coach/Coach';
import OwnerBookScheduled from './components/Coach/Calender/Calendar';
import Approve from './components/Admin/Approve/Approve';
import Paypal from './components/Paypal/Paypal';

//coach
import InformationExercise from './components/Coach/InformationExercise/InformationExercise';
import InformationMeal from './components/Coach/InformationMeal/InformationMeal';
import ManageForCoach from './components/Coach/ManageCoach/ManageCoach';
import DetailOfCustomer from './components/Coach/ManageCoach/DetailCustomer/DetailCustomer';
import InformationCustomer from './components/Coach/InformationCustomer/InformationCustomer';
import AddMealOfCoach from './components/Coach/AddMealOfCoach/AddMeal';
import AddExerciseOfCoach from './components/Coach/AddExerciseOfCoach/AddExercise';
import MyCoach from './components/pages/ScheduleOfCustomer/MyCoach';
import Schedule from './components/pages/ScheduleOfCustomer/Schedule/Schedule';
import History from './components/Coach/History/History';


const HtmlPage = () => {
  return (
    <iframe 
      src="http://127.0.0.1:5501/reactjs/src/components/Body/index.html" 
      title="Your Page"
      width="100%"  // Chiều rộng tối đa
      style={{ border: 'none' }} // Loại bỏ viền nếu không cần
    ></iframe>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home/>}></Route>
          <Route path="/introduce" element={<Introduce/>}> </Route>
          <Route path="/contact" element={<Contact/>}> </Route>
          {/* Customer */}
          <Route path="/user/public/register" element={<Register/>}> </Route>
          <Route path="/user/public/login" element={<Login/>}> </Route>
          <Route path="/user/service/body" element={<HtmlPage/>}> </Route>
          <Route path="/user/list_coaches" element={<Listcoaches/>}> </Route>
          <Route path="/user/edit_information" element={<EditInformation/>}> </Route>
          <Route path="/user/changepassword" element={<ChangePassword/>}> </Route>
          <Route path="/user/disableaccount" element={<DisableAccount/>}> </Route>
          <Route path="/user/paypal" element={<Paypal/>}> </Route>
          <Route path="/user/mycoach" element={<MyCoach/>}> </Route>
          <Route path="/user/mycoach/schedule/:id" element={<Schedule/>}> </Route>
          <Route path="/user/mycoach/schedulemeal" element={<ScheduleMeal/>}> </Route>
          <Route path="/user/mycoach/schedule_exercise" element={<ScheduleExercise/>}> </Route>
          <Route path="/user/myInvoice" element={<Invoices/>}> </Route>
          {/* //Coach */}
          <Route path="/coach/calendar/:id" element={<OwnerBookScheduled/>}> </Route>
          <Route path="/coach/manageCoach" element={<ManageForCoach/>}></Route>
          <Route path="/coach/manageCoach/detail/:id" element={<DetailOfCustomer/>}></Route>
          <Route path="/coach/manageCoach/InformationMeal" element={<InformationMeal/>}></Route>
          <Route path="/coach/manageCoach/InformationExercise" element={<InformationExercise/>}></Route>
          <Route path="/coach/manageCoach/InformationCustomer/:id" element={<InformationCustomer/>}></Route>
          <Route path="/coach/addmeal" element={<AddMealOfCoach/>}></Route>
          <Route path="/coach/addexercise" element={<AddExerciseOfCoach/>}></Route>
          <Route path="/coach/history/detail/:id" element={<History/>}></Route>
          {/* Admin */}
          <Route path="/admin/private/login" element={<LoginAdmin/>}> </Route>
          <Route path="/admin/meal" element={<Meal/>}> </Route>
          <Route path="/admin/exercise" element={<Exercise/>}> </Route>
          <Route path="/admin/user" element={<User/>}> </Route>
          <Route path="/admin/payment" element={<Payment/>}> </Route>
          <Route path="/admin/coach" element={<Coach/>}> </Route>
          <Route path="/admin/approve" element={<Approve/>}> </Route>

          {/* dùng để up dữ liệu meal and exercise */}
          
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
