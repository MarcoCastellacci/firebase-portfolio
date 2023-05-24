import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import DashWrapper from "../components/dashboardWrapper";
import { DeleteProyect, UpdateProyect, getProyects, insertNewProyect } from "../firebase/firebase";
import Proyects from "../components/proyects";
import ProyectsPages from "../routes/proyectsPages";
import LoaderAnimation from "../components/loader";
import '../styles/formularios.css'



export default function DashboardView() {


    const navigate = useNavigate()
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState()
    const [state, setState] = useState(0)
    const [adminPermisison, setAdminPermission] = useState(false)
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")

    const [proyects, setProyects] = useState([])

    useEffect(() => {
        console.log(proyects);
    }, [proyects])

    async function handleUserLoggedIn(user) {
        setCurrentUser(user)
        if (user.adminPermission) {
            setAdminPermission(true)
        }
        setState(2)
        const resProyects = await getProyects(user.uid)
        setProyects([...resProyects])
    }
    function handleUserNotRegister() {
        navigate("/login")
    }
    function handleUserNotLoggedIn() {
        navigate("/login")
    }

    if (state === 0) {
        return (
            <>
                <AuthProvider
                    onUserLoggedIn={handleUserLoggedIn}
                    onUserNotRegister={handleUserNotRegister}
                    onUserNotLoggedIn={handleUserNotLoggedIn}>
                    <LoaderAnimation></LoaderAnimation>
                </AuthProvider>
            </>
        )
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        addProyect()
    }

    function addProyect() {
        if (title !== "" && url !== "" && imageUrl !== "" && description !== "") {
            const newProyect = {
                id: uuidv4(),
                title: title,
                url: url,
                user: currentUser.uid,
                imageUrl: imageUrl,
                description: description,
            };
            const res = insertNewProyect(newProyect);
            newProyect.docId = res.id;
            setTitle("");
            setUrl("");
            setImageUrl("");
            setDescription("");
            setProyects([...proyects, newProyect])
            console.log(proyects);
        }
    }

    function handleOnChange(e) {
        const value = e.target.value
        if (e.target.name === "title") {
            setTitle(value)
        }
        if (e.target.name === "url") {
            setUrl(value)
        }
        if (e.target.name === "imageUrl") {
            setImageUrl(value)
        }
        if (e.target.name === "description") {
            setDescription(value)
        }
    }

    async function handleDeleteProyect(docId) {
        await DeleteProyect(docId);
        const tmp = proyects.filter(proyect => proyect.docId !== docId);
        setProyects([...tmp])

    }

    async function handleUpdateProyect(docId, title, url, imageUrl, description) {
        const proyect = proyects.find(item => item.docId === docId)
        proyect.title = title;
        proyect.url = url;
        proyect.imageUrl = imageUrl;
        proyect.description = description;

        await UpdateProyect(docId, proyect)
    }
    if (adminPermisison) {
        return (<>
            <div className="bg-container">
                <div className="home-container">
                    <DashWrapper user={currentUser} >
                        <form action="" onSubmit={handleOnSubmit} className="form-upload">
                            <div className="form">
                                <label htmlFor="title" className="input-border">Nombre del Pryecto</label>
                                <input placeholder="Type here" className="input-form" name="title" onChange={handleOnChange} type="text" />
                            </div>
                            <div className="form">
                                <label htmlFor="url" className="input-border">Url de la Web</label>
                                <input placeholder="Type here" className="input-form" name="url" onChange={handleOnChange} type="text" />
                            </div>

                            <div className="form">
                                <label htmlFor="imageUrl" className="input-border">Nombre del Pryecto</label>
                                <input placeholder="Type here" className="input-form" name="imageUrl" onChange={handleOnChange} type="text" />
                            </div>

                            <div className="form">
                                <label htmlFor="description">Descripcion de la Web</label>
                                <textarea type="text" name="description" cols="30" rows="10" className="descriptioon-txt input" onChange={handleOnChange} placeholder="Enter Text" required="" />
                            </div>

                            <div>
                                <input className="btn-submit" type="submit" value="Crear Nuevo Proyecto" />
                            </div>
                        </form>
                        {proyects?.map((proyect, index) => (
                            <div key={index}>
                                <Proyects key={proyect.docId} docId={proyect.docId} url={proyect.url} title={proyect.title} onDelete={handleDeleteProyect} onUpdate={handleUpdateProyect} imageUrl={proyect.imageUrl} description={proyect.description} />
                            </div>))}
                    </DashWrapper>
                </div>
            </div>
        </>)
    }
    return <>
        <DashWrapper user={currentUser}>
            <div className="bg-container">
                <div className="home-container">
                    {proyects?.map((proyect, index) => (
                        <div key={index}>
                            <ProyectsPages key={proyect.docId} url={proyect.url} title={proyect.title} imageUrl={proyect.imageUrl} description={proyect.description} />
                        </div>
                    ))}
                </div>
            </div>
        </DashWrapper>
    </>
}