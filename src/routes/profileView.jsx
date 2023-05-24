import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getProfilePhoto, getUserProfileInfo, userNameExist } from "../firebase/firebase";


export default function ProfileView() {
    const params = useParams();
    const [profile, setProfile] = useState(null)
    const [imgUrl, setImgUrl] = useState("")
    const [state, setState] = useState(0)


    useEffect(() => {
        getProfileUser();
        async function getProfileUser() {
            const username = params.username
            console.log(username);
            try {
                const userUid = await userNameExist(username)
                console.log(userUid);
                if (userUid) {
                    const userInfo = await getUserProfileInfo(userUid)
                    console.log(userInfo);
                    setProfile(userInfo)
                    const url = await getProfilePhoto(userInfo.profileInfo.profilePicture)
                    setImgUrl(url)
                } else {
                    setState(7)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [params])

    if (state === 7) {
        return <div>
            <h2>Usuario Inexistente</h2>
        </div>
    }
    return (
        <>
                <div>
                    <div>
                        <img src={imgUrl} alt="" />
                        <h1>Profile View</h1>
                        <h2>{profile?.profileInfo.displayName}</h2>
                        <h4>Titulo</h4>
                        {/* Datos de perfil de usuario */}
                    </div>
                    <Link to="/login">Atras</Link>
                </div>
        </>
    )
}