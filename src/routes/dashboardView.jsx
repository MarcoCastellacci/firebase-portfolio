import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
// eslint-disable-next-line
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import DashWrapper from "../components/dashboardWrapper";
import { DeleteProyect, UpdateProyect, getKnwoledge, getProyects, insertNewInfo } from "../firebase/firebase";
import Proyects from "../components/proyects";
import ProyectsPages from "../routes/proyectsPages";
import LoaderAnimation from "../components/loader";
import '../styles/formularios.css'



export default function DashboardView() {


    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState()
    const [state, setState] = useState(0)
    const [adminPermisison, setAdminPermission] = useState(false)
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [categorie, setCategorie] = useState("")
    const [description, setDescription] = useState("")

    const [proyects, setProyects] = useState([])
    const [technologies, setTechnologies] = useState([])

    useEffect(() => {
        async function getData() {
            const resProyects = await getProyects(categorie)
            const resTechs = await getKnwoledge(categorie)
            console.log(resProyects);
            console.log(resTechs);
            setProyects([...resProyects])
            setTechnologies([...resTechs])
        }
        getData()
    }, [categorie])

    async function handleUserLoggedIn(user) {
        setCurrentUser(user)
        if (user.adminPermission) {
            setAdminPermission(true)
        }
        setState(2)
        const resProyects = await getProyects(categorie)
        const resTechs = await getKnwoledge(categorie)
        console.log(resProyects);
        console.log(resProyects);
        setProyects([...resProyects])
        setTechnologies([...resTechs])
    }
    async function handleUserNotRegister() {
        setState(2)
        const resProyects = await getProyects(categorie)
        const resTechs = await getKnwoledge(categorie)
        setProyects([...resProyects])
        setTechnologies([...resTechs])
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
                    <LoaderAnimation />
                </AuthProvider>
            </>
        )
    }

    function handleOnSubmit(e) {
        console.log(e);
        e.preventDefault();
        addNewData()
    }

    console.log(categorie);
    function addNewData() {
        if (title !== "" && url !== "" && imageUrl !== "" && description !== "" && categorie !== "") {
            const newData = {
                id: uuidv4(),
                title: title,
                url: url,
                imageUrl: imageUrl,
                description: description,
                categorie: categorie
            };
            console.log(newData);
            const res = insertNewInfo(newData);
            console.log(res);
            newData.docId = res.id;
            setTitle("");
            setUrl("");
            setImageUrl("");
            setDescription("");
            setCategorie("");
            setTechnologies([...technologies, newData])
            setProyects([...proyects, newData])
            // console.log(proyects);
        }
    }

    function handleOnChange(e) {
        const value = e.target.value
        console.log(e);
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
        if (e.target.name === "categorie") {
            setCategorie(value)
        }
    }

    async function handleDeleteProyect(docId) {
        await DeleteProyect(docId);
        const tmp = proyects.filter(proyect => proyect.docId !== docId);
        setProyects([...tmp])
    }

    // Crear y armar las funciones para el borrado y actualizado de las tecnologias.
    // Empezar a mostrar los archivos con el "filtro de categoria y no el UID"

    async function handleUpdateProyect(docId, title, url, imageUrl, description, categorie) {
        const proyect = proyects.find(item => item.docId === docId)
        proyect.title = title;
        proyect.url = url;
        proyect.imageUrl = imageUrl;
        proyect.description = description;
        proyect.categorie = categorie

        await UpdateProyect(docId, proyect)
    }
    if (adminPermisison) {
        return (<>
            <div className="bg-container">
                <div className="home-container">
                    <DashWrapper user={currentUser} >
                        <form action="" onSubmit={handleOnSubmit} className="form-upload">
                            <div className="form">
                                <label htmlFor="title" className="input-border">Nombre del Pryecto o Tech</label>
                                <input placeholder="Nombre del Proyecto o Tech" className="input-form" name="title" onChange={handleOnChange} type="text" />
                            </div>
                            <div className="form">
                                <label htmlFor="url" className="input-border">Url de la Web</label>
                                <input placeholder="Url solo para Proyectos" className="input-form" name="url" onChange={handleOnChange} type="text" />
                            </div>
                            <div className="form">
                                <label htmlFor="categorie" className="input-border">Categoria</label>
                                <input placeholder="technologies o proyectos" className="input-form" name="categorie" onChange={handleOnChange} type="text" />
                            </div>
                            <div className="form">
                                <label htmlFor="imageUrl" className="input-border">Nombre del Pryecto</label>
                                <input placeholder="Url de la imagen" className="input-form" name="imageUrl" onChange={handleOnChange} type="text" />
                            </div>

                            <div className="form">
                                <label htmlFor="description">Descripcion</label>
                                <textarea type="text" name="description" cols="30" rows="10" className="descriptioon-txt input" onChange={handleOnChange} placeholder="Enter Text" required="" />
                            </div>

                            <div>
                                <input className="btn-submit" type="submit" value="Crear Nuevo Proyecto" />
                            </div>
                        </form>
                        {proyects?.map((proyect, index) => (
                            <div key={index}>
                                <Proyects key={proyect.docId} docId={proyect.docId} url={proyect.url} title={proyect.title} categoria={proyect.categoria} onDelete={handleDeleteProyect} onUpdate={handleUpdateProyect} imageUrl={proyect.imageUrl} description={proyect.description} />
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