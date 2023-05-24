import '../styles/loader.css'

export default function LoaderAnimation({ children }) {

    return (
        <>
            <div className="login">
                <div className="loader">
                    <div className="container">
                        <div className="carousel">
                            <div className="love"></div>
                            <div className="love"></div>
                            <div className="love"></div>
                            <div className="love"></div>
                            <div className="love"></div>
                            <div className="love"></div>
                            <div className="love"></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="carousel">
                            <div className="death"></div>
                            <div className="death"></div>
                            <div className="death"></div>
                            <div className="death"></div>
                            <div className="death"></div>
                            <div className="death"></div>
                            <div className="death"></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="carousel">
                            <div className="robots"></div>
                            <div className="robots"></div>
                            <div className="robots"></div>
                            <div className="robots"></div>
                            <div className="robots"></div>
                            <div className="robots"></div>
                            <div className="robots"></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}