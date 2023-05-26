import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import AuthProvider from "../components/authProvider";
import DashWrapper from "../components/dashboardWrapper";
import { UpdateUser, getProfilePhoto, setProfilePhoto } from "../firebase/firebase";
import LoaderAnimation from "../components/loader";


export default function ProfileEditView() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({})
    const [profileUrl, setProfileUrl] = useState(null)
    const fileRef = useRef(false)

    async function handleUserLoggedIn(user) {
        setCurrentUser(user)
        const url = await getProfilePhoto(user.profilePicture)
        setProfileUrl(url)
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

    function handelChangeFile(e) {
        const files = e.target.files;
        const fileReader = new FileReader();

        if (fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result
                const res = await setProfilePhoto(currentUser.uid, imageData)
                if (res) {
                    const tmpUser = { ...currentUser }
                    tmpUser.profilePicture = res.metadata.fullPath
                    await UpdateUser(tmpUser)
                    setCurrentUser(tmpUser)
                    const url = await getProfilePhoto(currentUser.profilePicture)
                    setProfileUrl(url);
                }
            }
        }
    }

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

            <DashWrapper user={currentUser}>
                <div>
                    <h2> Edit Profile </h2>
                    <div>
                        <img src={profileUrl} alt="" width={100} />
                    </div>
                    <div>
                        <button onClick={handleSelectImage}>Seleccionar Imagen</button>
                        <input ref={fileRef} type="file" name="" id="" style={{ display: "none" }} onChange={handelChangeFile} />
                    </div>
                </div>
            </DashWrapper>
        </>
    )
}