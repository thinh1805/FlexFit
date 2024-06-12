import { useEffect, useState } from "react";
import axiosInstance from "../../Axios/axios";
import "./Invoices.css";
import { Link } from "react-router-dom";
export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const user = JSON.parse(localStorage.getItem("authcustomer"));
  const token = user?.data?.auth_token;
  const id_user = user?.data?.auth?.id;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  useEffect(() => {
    getInvoices();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function getInvoices() {
    axiosInstance.get(`/getInvoices`, config)
      .then((response) => {
        console.log(response);
        setInvoices(response.data.invoices); // Assuming response.data.invoices is an array of invoices
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function renderInvoices() {
    return invoices.map((invoice) => (
      <table key={invoice.id}>
        <tbody>
          <tr className="top">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Invoices #: {invoice.id_invoice}<br />
                      Date: {formatDate(invoice.updated_at)}<br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="heading">
            <td>
              Information
            </td>
          </tr>
          <tr className="details">
            <td>
              Name: {invoice.name} <br />
              Phone: {invoice.phone}
            </td>
          </tr>
          <tr className="total">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Total: {invoice.total_money} VND<br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    ));
  }

  return (
    <div className="invoice-box center">
      <h1 className="invoice-title mb-4">Invoices</h1>
      {renderInvoices()}
      <div className="btn mt-4">
        <Link className="btn btn-back" to="/">Back To Home</Link>
      </div>
    </div>
  );
}