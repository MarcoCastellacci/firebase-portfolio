import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashWrapper({ children, user }) {
    const [username, setUsername] = useState("")
    const [adminPermission, setAdminPermission] = useState(false)


    useEffect(() => {
        setUsername(user.displayName)
        if (user.adminPermission) {
            setAdminPermission(true)
            setUsername(user.displayName)
        }
    }, [user])

    return (<>
        <div>
            <nav>
                <div>Logo</div>
                <Link to="/proyects">Proyectos</Link>
                <Link to="/tecnologies">Tecnologias</Link>
                <Link to="/kwgnoledge">Herramientas</Link>
                <Link to="/signout">Sign Out</Link>
                {/* Solamente al usuario Adminitrasdor */}
                {adminPermission ? <Link to={`/u/${username}`}>Perfil Admin</Link> : <Link to="/login">Perfil Admin</Link>}
            </nav>
            <div>
                {children}
            </div>
        </div>
    </>)

}