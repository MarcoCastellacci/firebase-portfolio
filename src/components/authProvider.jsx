import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {

    onAuthStateChanged,

} from "firebase/auth";
import { RegsiterNewUser, auth, getUserInfo, userExist } from "../firebase/firebase";


export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister }) {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid)
                    if (userInfo.email === "marco.castellacci87@gmail.com" && userInfo.processCompleted) {
                        onUserLoggedIn(userInfo);
                    } else {
                        onUserNotRegister(userInfo);
                    }
                } else {
                    await RegsiterNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: "",
                        adminPermission: false,
                        processCompleted: false,
                    })
                    // console.log(user);
                    // onUserNotRegister(user);
                }
            } else {
                onUserNotLoggedIn(user);
                console.log("No hay Usuarios Conectados...");
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return (
        <>
            <h1>{children}</h1>
        </>
    )
}