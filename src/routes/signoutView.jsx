import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

import { deleteUsersCollection, logout } from "../firebase/firebase";
import LoaderAnimation from "../components/loader";

export default function SignOut() {

    const navigate = useNavigate();

    return (
        <AuthProvider
            onUserLoggedIn={async () => {
                await deleteUsersCollection();
                await logout();
                navigate("/login");
            }}
            onUserNotRegister={async () => {
                await deleteUsersCollection();
                await logout();
                navigate("/login");
            }}
            onUserNotLoggedIn={() => {
                navigate("/login");
            }}
        >
            <LoaderAnimation />
        </AuthProvider>
    );
}