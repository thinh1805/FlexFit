import './Alert.css';
export default function Alert() {
    return (
        <div id="alert">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-5 alert_border mt-5">
                        <div className="row">
                            <div className="col-sm-5 center">
                                <img src="/FE/assets/image/image9.png" alt={8888} />
                            </div>
                            <div className="col-sm-7 center">
                                <div className="alert_title">
                                    <p className="red font-weight">Your % Body Fat is <span>10%</span></p>
                                </div>
                                <div className="alert_description center">
                                    <p className="red">Do you want to improve
                                        your body shape?</p>
                                </div>
                            </div>
                            <div className="col-sm-12 center mt-3">
                                <button className="btn btn-hire-coach">HIRE COACH</button>
                                <button className="btn">NO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}