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
// import { useNavigate } from 'react-router-dom'


export default function ProfileView() {
    // const params = useParams();
    const [currentUser, setCurrentUser] = useState({});
    // const navigate = useNavigate();
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
        setState(2)
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
                            <h1>Desarrollador</h1>
                            <h2>Fullstack</h2>
                            <button class="buttonDownload">
                                <a href={Cv} download>Descargar Curriculum</a>
                            </button>
                            {/* Datos de perfil de usuario */}
                            <div class="main">
                                <ul class="wrapper">
                                    <li class="icon facebook">
                                        <span class="tooltip">GitHub
                                        </span>
                                        <span><i class="fab fa-facebook">
                                            <a href="https://github.com/MarcoCastellacci" target="_blank" rel="noopener noreferrer">
                                                <img className='logo-redes' src="https://i.imgur.com/cye023n.png" alt="Github" />
                                            </a>
                                        </i></span>
                                    </li>
                                    <li class="icon twitter">
                                        <span class="tooltip">Twitter</span>
                                        <span><i class="fab fa-twitter">
                                            <a href="https://twitter.com/Castellacci_M" target="_blank" rel="noopener noreferrer">
                                                <img className='logo-redes' src="https://i.imgur.com/qnXxu8i.png" alt="Twitter" />
                                            </a>
                                        </i></span>
                                    </li>
                                    <li class="icon linkedin">
                                        <span class="tooltip">LinkedIn</span>
                                        <span><i class="fab fa-linkedin">
                                            <a href="https://www.linkedin.com/in/marco-castellacci/" target="_blank" rel="noopener noreferrer">
                                                <img className='logo-redes' src="https://i.imgur.com/xyGn5yf.png" alt="LinkedIn" />
                                            </a>
                                        </i></span>
                                    </li>
                                    <li class="icon whatsapp">
                                        <span class="tooltip">Whatsapp</span>
                                        <span><i class="fab fa-whatsapp">
                                            <a href="https://wa.me/541166022971" target="_blank" rel="noopener noreferrer">
                                                <img className='logo-redes' src="https://i.imgur.com/gwihoKw.png" alt="Github" />
                                            </a>
                                        </i></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='txt-perfil'>
                        <h4>
                            <span className='bienvenido'>¡Bienvenidos a mi portfolio! </span> Soy un apasionado desarrollador con una sólida base de experiencia práctica en un entorno de simulación laboral REAL, acumulando más de 700 horas de dedicación. Durante este tiempo, he trabajado con una amplia gama de tecnologías y herramientas, como React, MongoDb, Node JS, Express, Git, Github, JavaScript, C#, Visual Studio, .NET, Python, SQL, HTML5 y CSS.
                            <br />
                            <br />
                            Además de mi experiencia en el desarrollo web, también tengo habilidades destacadas en ventas y atención al cliente, lo cual me ha brindado una perspectiva centrada en el cliente y una comunicación efectiva. Aunque esta experiencia no está directamente relacionada con el desarrollo, creo firmemente que estas habilidades enriquecen mi capacidad para colaborar eficazmente en equipos y comprender las necesidades de los usuarios.
                            <br />
                            <br />
                            He tenido el privilegio de liderar equipos de desarrollo, demostrando habilidades en el manejo de grupos, el logro de objetivos y la investigación autodidacta. Además, he impartido cursos de capacitación en FrontEnd, compartiendo mis conocimientos y habilidades con otros profesionales.
                            <br />
                            <br />
                            Actualmente, me encuentro cursando el programa Codo a Codo para Python Developer y tengo previsto iniciar una tecnicatura en Desarrollo de Software en los Institutos de Formación Profesional de la Ciudad, con el fin de consolidar los conocimientos adquiridos a lo largo de mi trayectoria.
                            <br />
                            <br />
                            Estoy emocionado y motivado para seguir aprendiendo, creciendo y mejorando como profesional. Siempre busco nuevos desafíos y oportunidades para aplicar mis habilidades y conocimientos en el desarrollo de soluciones innovadoras y de calidad.
                            <br />
                            <br />
                            Gracias por visitar mi portfolio. ¡No dudes en ponerse en contacto conmigo para colaboraciones o proyectos interesantes!
                        </h4>
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
                                <textarea name="Msj" placeholder='Leave me a message... // Deja Tu Mensaje...' className='textarea-msj' rows="5" cols="150"></textarea>
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