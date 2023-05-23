import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { ConfirmEmail, UpdateUser } from "../firebase/firebase";

export default function ConfirmEmailView() {

    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [email, setEmail] = useState("");

    function handleUserLoggedIn(user) {
        navigate('/dashboard')
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
            <div>
                <h1>Bienvenido a mi Portfolio {currentUser.displayName}</h1>
                <p>Porfavor Confirma tu email para continuar</p>
                {state === 5 ? <p>El correo registrado ya Existe</p> : ""}
                <div>
                    <input type="text" onChange={handleInputEmail} /></div>
            </div >
            <div><button onClick={handleContinuar}> Continuar </button></div>
        </>
    }

    if (state === 6) {
        return <>
            <div>
                <h2>Ya puedes Continuar explorando Mi Portfolio</h2>
                <Link to={'/dashboard'}>Continuar</Link>
            </div >
        </>
    }
    return (
        <>
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}>Confirm View
            </AuthProvider>
        </>
    )
}