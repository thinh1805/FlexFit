import "./Paypal.css";
import axios from "axios";

export default function Paypal() {
  var customer = localStorage.getItem("authcustomer")
  if (customer) {
    customer = JSON.parse(customer);
    var token = customer.data.auth_token;
    var id = customer.data.auth.id;
  }
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  function handleSubmit(price) {
    const data = {
      price: price
    };
    axios.post("http://localhost/BE/public/api/process-paypal", data, config)
      .then(response => {
        window.location.href = response.data.link;
      })
      .catch(function (error) {
        console.error("There was an error processing the payment!", error);
      });
  }
  return (
    <div id="pay">
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 center mt-5">
            <p className="pay_title">Choose Your Payment</p>
            <p>Let's choose the package that is best for you and explore it happily and cheerfully</p>
          </div>
          <div className="col-sm-12 mb-5">
            <div className="flex">
              <div className="border width background-white" id="container">
                <div className="pay_one_month center">
                  <img src="http://localhost/BE/public/images/image3.jpg" alt="1 month package" />
                </div>
                <div className="pay_detail">
                  <p><i className="fa-solid fa-check" /><span>Hire a tour guide for 1 month</span></p>
                  <p><i className="fa-solid fa-check" /><span>See instructor reviews</span></p>
                </div>
                <div className="pay_money center">
                  <p><span>$2</span>/1 mo</p>
                </div>
                <div className="center mb-5">
                  <button className="btn" id="selectButton" onClick={() => handleSubmit(46000)}>Select</button>
                </div>
              </div>
              <div className="border width background-white" id="container1">
                <div className="pay_three_month center ">
                  <img src="http://localhost/BE/public/images/image3.jpg" alt="3 month package" />
                </div>
                <div className="pay_detail">
                  <p><i className="fa-solid fa-check" /><span>Hire a tour guide for 1 month</span></p>
                  <p><i className="fa-solid fa-check" /><span>See instructor reviews</span></p>
                </div>
                <div className="pay_money center">
                  <p><span>$5</span>/3 mo</p>
                </div>
                <div className="center mb-5">
                  <button className="btn" id="selectButton1" onClick={() => handleSubmit(115000)}>Select</button>
                </div>
              </div>
              <div className="border width background-white" id="container2">
                <div className="pay_six_month center">
                  <img src="http://localhost/BE/public/images/image3.jpg" alt="6 month package" />
                </div>
                <div className="pay_detail">
                  <p><i className="fa-solid fa-check" /><span>Hire a tour guide for 1 month</span></p>
                  <p><i className="fa-solid fa-check" /><span>See instructor reviews</span></p>
                </div>
                <div className="pay_money center">
                  <p><span>$12</span>/6 mo</p>
                </div>
                <div className="center mb-5">
                  <button className="btn" id="selectButton2" onClick={() => handleSubmit(276000)}>Select</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}