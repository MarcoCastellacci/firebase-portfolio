import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashWrapper({ children, user }) {
    const [username, setUsername] = useState("")
    const [adminPermission, setAdminPermission] = useState(false)
    const location = useLocation();

    useEffect(() => {
        try {
            // console.log(user);
            setUsername(user.displayName)
            if (user.adminPermission) {
                setAdminPermission(true)
                setUsername(user.displayName)
            }
        } catch (error) {
            console.error(error);
        }
    }, [user])

    return (<>
        <div className="bg-container">
            <nav>
                <ul>
                    <li>
                        <Link className="navbar-dash" to={location.pathname === "/habilidades" ? "/home" : "/habilidades"}>{location.pathname === "/habilidades" ? "Home" : "Habilidades"}</Link>
                    </li>
                    <li>
                        <Link className="navbar-dash" to="/signout">Sign Out</Link>
                    </li>
                    <li>
                        {/* Solamente al usuario Adminitrasdor */}
                        {adminPermission ? <Link className="navbar-dash" to={`/u/${username}`}>Perfil Admin</Link> : null}
                    </li>
                </ul>
                <div className="title-portfolio nav-portfolio">
                    <h1>Marco Castellacci</h1>
                </div>
            </nav>
            <div>
                {children}
            </div>
        </div>
    </>)

}