import "./Contact.css";
export default function Contact() {
    return (
        <div id="Contact">
            <div class="container">
                <div className="row">
                    <div className="col-sm-6 information">
                        <div className="title">
                            <h4 className="mb-4">Information Contact</h4>
                        </div>
                        <div className="captone">
                            <p>C2SE.32_Flexible Gym Solutions for Life Website</p>
                        </div>
                        <div className="detail">
                            <p><span>Phone:</span> 0777 118 502</p>
                            <p><span>Zalo:</span> 0777 118 502</p>
                            <p><span>Email:</span> C2SE.32@gmail.com</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6 title mt-3">
                                <input type="text" className="w-100" placeholder="Full Name"></input>
                                <input type="text" className="w-100" placeholder="Email"></input>
                            </div>
                            <div className="col-sm-6 title mt-3">
                                <input type="text" className="w-100" placeholder="Phone"></input>
                                <input type="text" className="w-100" placeholder="Title"></input>
                            </div>
                            <div className="mt-4 description">
                                <input type="text" className="w-100" placeholder="Description"></input>
                            </div>
                            <div className="mt-5 mb-5">
                                <button className="btn btn-send">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}