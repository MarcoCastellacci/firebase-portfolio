import AuthProvider from "../components/authProvider";


export default function DashboardView() {

    function handleUserLoggedIn() {
    }
    function handleUserNotRegister() {
    }
    function handleUserNotLoggedIn() {
    }

    return (
        <>
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}>Dash View</AuthProvider>
        </>
    )
}