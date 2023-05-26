import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthProvider from "../components/authProvider";
import LoaderAnimation from "../components/loader";

import '../styles/btn-google.css'
import '../styles/styles.css'

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
        googleProvider.setCustomParameters({ prompt: "select_account" });
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
    if (state === 4 || state === 5) {
        return (
            <>
                <div className="banner-login">
                    <div className="img-homepage">
                        <img src="https://i.imgur.com/oYuETeq.png" alt="Foto de mi Perfil" />
                    </div>
                    <div className="title-portfolio">
                        <h1>Portfolio Profesional </h1>
                        <sub>Desarrollador</sub>
                    </div>
                </div>
                <div className="description-profile bg-container">
                    <div className="contenedor-txt-description">
                        <h2 className="description-txt-profile ">
                            Soy un desarrollador web apasionado por la tecnología, dedicado a perfeccionar mis habilidades y conocimientos. Mi entusiasmo por aprender nuevas tecnologías y mi capacidad para colaborar en equipo me impulsan a alcanzar resultados excepcionales. La tecnología y la programación han dejado de ser solo un trabajo para convertirse en mi pasión.
                        </h2>
                    </div>
                    <div className="title-portfolio">
                        <h1>Marco Castellacci</h1>
                    </div>
                    <div>
                        <h2 className="nombre-cnotenedor">
                            <div className="nombre"><span>Marco Castellacci</span> </div>
                            <div className="message">
                                <div className="word1">Fullstack Developer</div>
                                <div className="word2">Software Developer</div>
                                <div className="word3">Web Designer</div>
                            </div>
                        </h2>
                    </div>
                </div>
                <div className="login btn-login">
                    <button className="button" onClick={handleOnCLick}>
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        Continue with Google
                    </button>
                    <p>Los datos solicitados seran utilizados unicamente para el inicio de sesion.</p>
                </div>
            </>
        );
    }
    return <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegister={handleUserNotRegister}
        onUserNotLoggedIn={handleUserNotLoggedIn}>
        <LoaderAnimation/>
    </AuthProvider>
}
