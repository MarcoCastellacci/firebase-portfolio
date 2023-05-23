import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {

    onAuthStateChanged,

} from "firebase/auth";
import { RegsiterNewUser, auth, userExist } from "../firebase/firebase";


export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister }) {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    navigate("/dashboard")
                    onUserLoggedIn(user);
                } else {
                    await RegsiterNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: "",
                        adminPermission: false
                    })
                    onUserNotRegister(user);
                }
            } else {
                onUserNotLoggedIn(user);
                console.log("No hay Usuarios Coectados...");
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return (
        <>
            <h1>{children}</h1>
        </>
    )
}