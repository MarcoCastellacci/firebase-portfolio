import { useEffect, useRef, useState } from "react"
import '../styles/dashstyle.css'



export default function Proyects({ docId, title, url, imageUrl, description, onDelete, categoria, onUpdate }) {
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [currentCategorie, setCurrentCategorie] = useState(categoria)

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);
    const [editCategorie, setEditCategorie] = useState(false)

    const titleRef = useRef(null);
    const urlRef = useRef(null)

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus()
        };
    }, [editTitle])

    useEffect(() => {
        if (urlRef.current) {
            urlRef.current.focus()
        };
    }, [editUrl])

    function handleEditUrl() {
        setEditUrl(true)
    }
    function handleEditTitle() {
        setEditTitle(true)
    }
    function handleEditCategorie() {
        setEditCategorie(true)
    }


    function handleDeleteProyect() {
        onDelete(docId)
    }


    function handleChangeTitle(e) {
        setCurrentTitle(e.target.value)
    }
    function handleChangeUrl(e) {
        setCurrentUrl(e.target.value)
    }
    function handleChangeCategorie(e) {
        setCurrentCategorie(e.target.value)
    }


    function handleBlurUrl(e) {
        setEditUrl(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, imageUrl, description)
    }
    function handleBlurTitle(e) {
        setEditTitle(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, imageUrl, description)
    }
    function handleBlurCategorie(e) {
        setEditCategorie(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, imageUrl, description)
    }

    return (
        <>
            <div className="proyect-profile">
                <div key={docId}>
                    <div className="editable-page">
                        <div className="edit">
                            <div>{editUrl ? (<>
                                <input ref={titleRef} value={currentUrl} onChange={handleChangeUrl} onBlur={handleBlurUrl} />
                            </>) :
                                (<>
                                    <button onClick={handleEditUrl}>Edit Url</button>
                                    <a href={url} className="proyect-link"><img className="img-proyect" src={imageUrl} alt="Logo de la Tienda" /></a>
                                </>)}
                            </div>
                        </div>
                        <div className="edit">
                            <div>{editTitle ? (<>
                                <input ref={urlRef} value={currentTitle} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
                            </>) : (<>
                                <button onClick={handleEditTitle}>Edit Title</button>
                                <h2>{title}</h2>
                            </>)}
                            </div>
                        </div>
                        <div className="edit">
                            <div>{editCategorie ? (<>
                                <input ref={urlRef} value={currentCategorie} onChange={handleChangeCategorie} onBlur={handleBlurCategorie} />
                            </>) : (<>
                                <button onClick={handleEditCategorie}>Edit Categorie</button>
                                <h2>{categoria}</h2>
                            </>)}
                            </div>
                        </div>
                        <div className="description-edit">
                            <p>{description}</p>
                        </div>
                        <div>
                            <button onClick={handleDeleteProyect} className="btn-delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}