// import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import ProfileImg from '../Assets/Perfil.png'
import Cv from '../Assets/MarcoCastellacci.pdf'
// import { getProfilePhoto, getUserProfileInfo, userNameExist } from "../firebase/firebase";

import '../styles/profile.css'
import DashWrapper from "../components/dashboardWrapper"


export default function ProfileView() {
    // const params = useParams();
    // const [profile, setProfile] = useState(null)
    // const [imgUrl, setImgUrl] = useState("")
    // const [state, setState] = useState(0)


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

    return (
        <>
            <DashWrapper>
                <div>
                    <div>
                        <img src={ProfileImg} alt="" />
                        <h1>Marco Castellacci</h1>
                        <h2>Datos</h2>
                        <h4>Titulo</h4>
                        <a href={Cv} download>Descargar Curriculum</a>
                        {/* Datos de perfil de usuario */}
                    </div>
                </div>
            </DashWrapper>
        </>
    )
}