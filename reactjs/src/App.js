import Header from "./components/layout/Header/Header"; 
import Footer from "./components/layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { TokenContext } from "./components/Token/Token";
import { useState , useEffect } from "react";
function App(props) {
  let params1 = useLocation();
  
  function render() {
    if (params1['pathname'].includes("admin")) {
      return (
        <div>
          {props.children}
        </div>
      )
    }else if(params1['pathname'].includes("private")){
      return (
        <div>
          {props.children}
        </div>
      )
    }else if(params1['pathname'].includes("public")){
      return (
        <div>
          {props.children}
        </div>
      )
    }
    else if(params1['pathname'].includes("calendar")){
      return (
        <div>
          {props.children}
        </div>
      )
    }
    else if(params1['pathname'].includes("schedule")){
      return (
        <div> 
          <Header/>
          <div>
            {props.children}
          </div>
        </div>
      )
    }
    else if(params1['pathname'].includes("http://127.0.0.1:5502/reactjs/src/components/Body/index.html")){
      return (
        <div>
          
          {props.children}
        </div>
      )
    }
    else {
      return(
        <div>
          <Header/>
            <div>
              {props.children}
            </div>
          <Footer/>
        </div>
      )
    }

  }
  const storedTokenCustomer = JSON.parse(localStorage.getItem("authcustomer"));
  const storedTokenCoach = JSON.parse(localStorage.getItem("authcoach"));
  return(
    <div>
      <TokenContext.Provider value={{storedTokenCustomer,storedTokenCoach}}>
        {render()}
      </TokenContext.Provider>
    </div>

  )
}

export default App;
