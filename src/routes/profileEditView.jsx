import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import AuthProvider from "../components/authProvider";
import DashWrapper from "../components/dashboardWrapper";


export default function ProfileEditView() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({})
    const [profileUrl, setProfileUrl] = useState(null)

    const fileRef = useRef(false)

    async function handleUserLoggedIn(user) {
        setCurrentUser(user)
        setState(2)
    }
    function handleUserNotRegister(user) {
        navigate('/login')
    }
    function handleUserNotLoggedIn() {
        navigate('/login')
    }

    function handleSelectImage() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }
    return (
        <>
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}>
                <DashWrapper>
                    <div>
                        <h2> Edit Profile </h2>
                        <div>
                            <img src={profileUrl} alt="" width={100} />
                        </div>
                        <div>
                            <button onClick={handleSelectImage}>Seleccionar Imagen</button>
                            <input ref={fileRef} type="file" name="" id="" style={{display: "none"}}/>
                        </div>
                    </div>
                </DashWrapper>
            </AuthProvider>
        </>
    )
}