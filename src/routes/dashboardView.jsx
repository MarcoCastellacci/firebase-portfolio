import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import DashWrapper from "../components/dashboardWrapper";
import { DeleteProyect, UpdateProyect, getProyects, insertNewProyect } from "../firebase/firebase";
import Proyects from "../components/proyects";



export default function DashboardView() {


    const navigate = useNavigate()
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState()
    const [state, setState] = useState(0)

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
                    Dash View
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
        const tmp = proyects.filter( proyect => proyect.docId !== docId);
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

    return <>
        <DashWrapper>
            <div>
                <h1>Dashboard View</h1>

                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={handleOnChange} />

                    <label htmlFor="url">Url</label>
                    <input type="text" name="url" onChange={handleOnChange} />

                    <label htmlFor="imageUrl">Imagen URL</label>
                    <input type="text" name="imageUrl" onChange={handleOnChange} />

                    <label htmlFor="description">Url</label>
                    <textarea name="description" id="description" cols="30" rows="10" className="descriptioon-txt" onChange={handleOnChange} />

                    <input type="submit" value="Crear Nuevo Proyecto" />
                </form>

                <div>
                    {proyects?.map((proyect, index) => (
                        <div key={index}>
                            <Proyects key={proyect.docId} docId={proyect.docId} url={proyect.url} title={proyect.title} onDelete={handleDeleteProyect} onUpdate={handleUpdateProyect} imageUrl={proyect.imageUrl} description={proyect.description} />
                        </div>
                    ))}
                </div>
            </div>
        </DashWrapper>
    </>
}