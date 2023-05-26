import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashWrapper({ children, user }) {
    const [username, setUsername] = useState("")
    const [adminPermission, setAdminPermission] = useState(false)


    useEffect(() => {
        try {
            console.log(user);
            setUsername(user.displayName)
            if (user.adminPermission) {
                setAdminPermission(true)
                setUsername(user.displayName)
            }
            console.log(user.email);
        } catch (error) {
            console.error(error);
        }
    }, [user])

    return (<>
        <div className="bg-container">
            <nav>
                <ul>
                    <li>
                        <Link className="navbar-dash" to="/proyects">Proyectos</Link>
                    </li>
                    <li>
                        <Link className="navbar-dash" to="/tecnologies">Tecnologias</Link>
                    </li>
                    <li>
                        <Link className="navbar-dash" to="/kwgnoledge">Herramientas</Link>
                    </li>
                    <li>
                        <Link className="navbar-dash" to="/signout">Sign Out</Link>
                    </li>
                    <li>
                        {/* Solamente al usuario Adminitrasdor */}
                        {adminPermission ? <Link className="navbar-dash" to={`/u/${username}`}>Perfil Admin</Link> : <Link className="navbar-dash" to="/dashboard">Perfil Admin</Link>}
                    </li>
                </ul>
            </nav>
            <div>
                {children}
            </div>
        </div>
    </>)

}