import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthProvider from "../components/authProvider";

//   Stages:
//   0: initiated
//   1: loading
//   2: login completed
//   3: login but not confirm email
//   4: not logged
//   5: email exist!
//   6: continues clicked

export default function LoginView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);

    function handleUserLoggedIn(user) {
        navigate('/dashboard')
    }
    function handleUserNotRegister(user) {
        navigate('/confirm_email')
    }
    function handleUserNotLoggedIn() {
        setState(4)
    }
    //Funcion de Login Con Google
    async function handleOnCLick() {
        const googleProvider = new GoogleAuthProvider();
        await SingInWithGoogle(googleProvider);

        async function SingInWithGoogle(googleProvider) {
            try {
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
    }
    if (state === 4) {
        return (
            <>
                <button onClick={handleOnCLick}>Login View</button>
            </>
        );
    }

    if (state === 5) {
        return (
            <>
                <button onClick={handleOnCLick}>Login View</button>
            </>
        );
    }

    return <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegister={handleUserNotRegister}
        onUserNotLoggedIn={handleUserNotLoggedIn}>

        <div>Cargando los Datos...</div>
    </AuthProvider>
}
