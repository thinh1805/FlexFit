import "./Content.css"
export default function Content() {
    return (
        <div id="content">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="content_img">
                            <img src="http://localhost/BE/public/images/Image2.jpg" alt={8888} />
                        </div>
                    </div>
                    <div className="col-sm-6 padding">
                        <p className="content_title">We Provide Many Features You Can Use</p>
                        <p>You can explore the features that we provide with fun and have their own functions each feature.</p>
                        <p><i className="fa-solid fa-circle-check" /> <span>Provides accurate BMI and Body fat from your body data</span></p>
                        <p><i className="fa-solid fa-circle-check" /> <span>Provide exercises to ensure health</span></p>
                        <p><i className="fa-solid fa-circle-check" /> <span>Provide appropriate meals</span></p>
                        <p><i className="fa-solid fa-circle-check" /> <span>Hire a coach</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}