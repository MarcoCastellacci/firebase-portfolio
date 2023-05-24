import { Link } from "react-router-dom";

export default function DashWrapper({ children }) {

    return (<>
        <div>
            <nav>
                <div>Logo</div>
                <Link to="/proyects">Proyectos</Link>
                <Link to="/tecnologies">Tecnologias</Link>
                <Link to="/kwgnoledge">Herramientas</Link>
                <Link to="/signout">Sign Out</Link>
                {/* Solamente al usuario Adminitrasdor */}
                <Link to="/dashboard/profile">Perfil Admin</Link>
            </nav>
            <div>
                {children}
            </div>
        </div>
    </>)

}