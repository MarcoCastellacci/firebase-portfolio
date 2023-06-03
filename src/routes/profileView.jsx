// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"

import ProfileImg from '../Assets/Perfil.png'
import Cv from '../Assets/MarcoCastellacci.pdf'
// import { getProfilePhoto, getUserProfileInfo, userNameExist } from "../firebase/firebase";

import '../styles/profile.css'
import DashWrapper from "../components/dashboardWrapper"
import LoaderAnimation from '../components/loader'
import AuthProvider from '../components/authProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ProfileView() {
    // const params = useParams();
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    // const [imgUrl, setImgUrl] = useState("")
    const [state, setState] = useState(0);

    async function handleUserLoggedIn(user) {
        setCurrentUser(user)
        setState(2)
    }
    function handleUserNotRegister(user) {
        setCurrentUser(user)
        setState(2)
    }
    function handleUserNotLoggedIn() {
        navigate('/login')
    }
    // useEffect(() => {
    //     getProfileUser();
    //     async function getProfileUser() {
    //         const username = params.username
    //         console.log(username);
    //         try {
    //             const userUid = await userNameExist(username)
    //             console.log(userUid);
    //             if (userUid) {
    //                 const userInfo = await getUserProfileInfo(userUid)
    //                 console.log(userInfo);
    //                 setProfile(userInfo)
    //                 const url = await getProfilePhoto(userInfo.profileInfo.profilePicture)
    //                 setImgUrl(url)
    //             } else {
    //                 setState(7)
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }, [params])

    // if (state === 7) {
    //     return <div>
    //         <h2>Usuario Inexistente</h2>
    //     </div>
    // }

    console.log(currentUser);
    if (state !== 2) {
        return <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}>
            <LoaderAnimation />
        </AuthProvider>
    }
    return (
        <>
            <DashWrapper>
                <div className='profile-container'>
                    <div className='profile-data'>
                        <div className='img-profile'>
                            <img src={ProfileImg} alt="" />
                        </div>
                        <div className='data'>
                            <h1>Marco Castellacci</h1>
                            <h2>Datos</h2>
                            <h4>Titulo</h4>
                            <a href={Cv} download>Descargar Curriculum</a>
                            {/* Datos de perfil de usuario */}
                        </div>
                    </div>
                    <div className="home-container">
                        <form action="https://formsubmit.co/848ee880af437792600702bc576c1438" method='POST' className="contact-form">
                            <div className="textInputWrapper input-text">
                                <input placeholder={currentUser.displayName} name='Full Name' type="text" className="textInput" value={currentUser.displayName} />
                            </div>
                            <div className="textInputWrapper input-mail">
                                <input placeholder={currentUser.email} name='Mail' type="mail" className="textInput" value={currentUser.email} />
                            </div>
                            <div className="textInputWrapper input-tel">
                                <input placeholder="Your Phone Number" name='Tel' type="tel" className="textInput" />
                            </div>
                            <div className="textInputWrapper textarea-input">
                                <textarea name="Msj" placeholder='Leave me a message' className='textarea-msj' rows="5" cols="150"></textarea>
                            </div>
                            <input type="submit" value="Send" className="submitButton" />

                            <input type="hidden" name="_next" value="http://localhost:3000/" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="box" />
                        </form>
                    </div>
                </div>
            </DashWrapper>
        </>
    )
}