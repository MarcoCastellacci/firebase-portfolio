import '../styles/loader.css'

export default function LoaderAnimation({ children }) {

    return (
        <>
            <div className="login-loader">
                <div className="loader JS_on">
                    <span className="binary"></span>
                    <span className="binary"></span>
                    <span className="getting-there">Cargando los Datos...</span>
                </div>
            </div>

        </>
    )
}