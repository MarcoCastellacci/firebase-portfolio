import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { ConfirmEmail, UpdateUser } from "../firebase/firebase";
import LoaderAnimation from "../components/loader";
import DashWrapper from "../components/dashboardWrapper";

export default function ConfirmEmailView() {

    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [email, setEmail] = useState("");

    function handleUserLoggedIn(user) {
        navigate('/home')
    }
    function handleUserNotRegister(user) {
        setState(3)
        setCurrentUser(user)
    }
    function handleUserNotLoggedIn() {
        navigate('/login')
    }

    function handleInputEmail(e) {
        setEmail(e.target.value)
    }

    async function handleContinuar() {
        if (email !== "") {
            const exist = await ConfirmEmail(email);
            if (exist) {
                setState(5);
            } else {
                const tmp = { ...currentUser }
                tmp.email_confirmed = email;
                if (tmp.email_confirmed === "marco.castellacci87@gmail.com") {
                    tmp.adminPermission = true
                    tmp.processCompleted = true
                    await UpdateUser(tmp)
                    setState(6)
                } else {
                    tmp.adminPermission = false
                    tmp.processCompleted = true
                    await UpdateUser(tmp)
                    setState(6)
                }
            }
        }
    }
    if (state === 3 || state === 5) {
        return <>
            <DashWrapper>
                <div className="bg-container confirm-email">
                    <div className="img-logo">
                        <img src="https://i.imgur.com/lS5CWpg.png" alt="Logo de mi Web" />
                    </div>
                    <div className="confirm-txt">
                        <h1>Bienvenido a mi Portfolio {currentUser.displayName}</h1>
                        {state === 5 ? <p>El correo registrado ya Existe</p> : ""}
                        <div className="input-confirm">
                            <p>Porfavor Confirma tu email para continuar</p>
                            <input type="text" onChange={handleInputEmail} />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleContinuar}> Continuar </button>
                    </div>
                </div>
            </DashWrapper>
        </>
    }

    if (state === 6) {
        return <>
            <div className="bg-container confirm-email">
                <h2>Muchas Gracias {currentUser.displayName}</h2>
                <h2>Ya puedes Continuar explorando Mi Portfolio</h2>
                <button className="link-btn">
                    <Link className="link" to={'/home'}>Continuar</Link>
                </button>
            </div >
        </>
    }
    return (
        <>
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}>
                <LoaderAnimation />
            </AuthProvider>
        </>
    )
}