import "./Statistics.css"
export default function Statistics(){
    return(
        <div id="statistics">
        <div className="container">
          <div className="row box-shadow">
            <div className="col-sm-4 border-right">
              <div className="row justify-content-center ">
                <div className="col-sm-8 flex">
                  <div className="statistics_image">
                    <img src="http://localhost/BE/public/images/Image4.jpg" alt={8888} />
                  </div> 
                  <div className="padding">
                    <p className="statistics_users mb-1 font-weight">90+</p>
                    <p>Users</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 border-right">
              <div className="row justify-content-center">
                <div className="col-sm-8 flex">
                  <div className="statistics_image">
                    <img src="http://localhost/BE/public/images/Image5.jpg" alt={8888} />
                  </div> 
                  <div className="padding">
                    <p className="statistics_users mb-1 font-weight">90+</p>
                    <p>Coachs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 margin">
              <div className="row justify-content-center">
                <div className="col-sm-8 flex">
                  <div className="statistics_image">
                    <img src="http://localhost/BE/public/images/Image6.jpg" alt={8888} />
                  </div> 
                  <div className="padding ">
                    <p className="statistics_users mb-1 font-weight ">90+</p>
                    <p>Exercises and Meals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}