import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
// eslint-disable-next-line
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import DashWrapper from "../components/dashboardWrapper";
import { DeleteProyect, UpdateProyect, getKnwoledge, getProyects, insertNewInfo } from "../firebase/firebase";
import Proyects from "../components/proyects";
import ProyectsPages from "../components/proyectsPages";
import LoaderAnimation from "../components/loader";
import TechnologiesPage from '../components/technologies';

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
            // console.log(resProyects);
            // console.log(resTechs);
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
        setProyects([...resProyects])
        setTechnologies([...resTechs])
        // console.log(resProyects);
        // console.log(resTechs);
    }
    async function handleUserNotRegister() {
        setState(2)
        const resProyects = await getProyects(categorie)
        const resTechs = await getKnwoledge(categorie)
        // console.log(resProyects);
        // console.log(resTechs);
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
        // console.log(e);
        e.preventDefault();
        addNewData()
    }

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
            // console.log(newData);
            const res = insertNewInfo(newData);
            // console.log(res);
            newData.docId = res.id;
            setTitle("");
            setUrl("");
            setImageUrl("");
            setDescription("");
            setCategorie("");
            if (newData.categorie === "proyects") {
                setProyects([...proyects, newData])
            } else {
                setTechnologies([...technologies, newData])
            }
            // console.log(proyects);
        }
    }

    function handleOnChange(e) {
        const value = e.target.value
        // console.log(e);
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

    async function handleUpdateProyect(docId, title, url, imageUrl, description, categorie) {
        if (categorie === "proycets") {
            const proyect = proyects.find(item => item.docId === docId)
            console.log(proyects);
            proyect.title = title;
            proyect.url = url;
            proyect.imageUrl = imageUrl;
            proyect.description = description;
            proyect.categorie = categorie

            await UpdateProyect(docId, proyect)
        }
        if (categorie === "techonologies") {
            const techno = technologies.find(item => item.docId === docId)
            console.log(techno);
            techno.title = title;
            techno.url = url;
            techno.imageUrl = imageUrl;
            techno.description = description;
            techno.categorie = categorie

            await UpdateProyect(docId, techno)
        }
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
                                <label htmlFor="imageUrl" className="input-border">Url de la Imagen</label>
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
                        <h1 className="titulos-dash">Proyectos</h1>
                        {proyects?.map((proyect, index) => (
                            <div key={index}>
                                <Proyects key={proyect.docId} docId={proyect.docId} url={proyect.url} title={proyect.title} categoria={proyect.categorie} onDelete={handleDeleteProyect} onUpdate={handleUpdateProyect} imageUrl={proyect.imageUrl} description={proyect.description} />
                            </div>))}
                        <h1 className="titulos-dash">Tecnologias y Herramientas</h1>
                        {technologies?.map((technique, index) => (
                            <div className="techno" key={index}>
                                <Proyects key={technique.docId} docId={technique.docId} url={technique.url} title={technique.title} categoria={technique.categorie} onDelete={handleDeleteProyect} onUpdate={handleUpdateProyect} imageUrl={technique.imageUrl} description={technique.description} />
                            </div>
                        ))}
                    </DashWrapper>
                </div>
            </div>
        </>)
    }
    return <>
        <DashWrapper user={currentUser}>
            <div className="bg-container">
                <div className="home-container">
                    <div className="proyect-container">
                        <ProyectsPages proyects={proyects} />
                    </div>
                    {technologies?.map((technique, index) => (
                        <div className="technos" key={index}>
                            <TechnologiesPage key={technique.docId} title={technique.title} imageUrl={technique.imageUrl} description={technique.description} />
                        </div>
                    ))}
                </div>
            </div>
        </DashWrapper>
    </>
}