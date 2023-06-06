import { useEffect, useRef, useState } from "react"
import '../styles/dashstyle.css'



export default function Proyects({ docId, title, url, imageUrl, description, onDelete, categoria, onUpdate }) {
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [currentCategorie, setCurrentCategorie] = useState(categoria)
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);
    const [editCategorie, setEditCategorie] = useState(false)
    const [editImageUrl, setEditImageUrl] = useState(false)

    const titleRef = useRef(null);
    const urlRef = useRef(null)
    const imageRef = useRef(null)
    const categorieRef = useRef(null)

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

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.focus()
        };
    }, [editImageUrl])
    useEffect(() => {
        if (categorieRef.current) {
            categorieRef.current.focus()
        };
    }, [editCategorie])
    function handleEditUrl() {
        setEditUrl(true)
    }
    function handleEditTitle() {
        setEditTitle(true)
    }
    function handleEditCategorie() {
        setEditCategorie(true)
    }
    function handleEditImageUrl() {
        setEditImageUrl(true)
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
    function handleChangeImageUrl(e) {
        setCurrentImageUrl(e.target.value)
    }


    function handleBlurUrl(e) {
        setEditUrl(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, currentImageUrl, description)
    }
    function handleBlurTitle(e) {
        console.log(currentTitle);
        setEditTitle(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, currentImageUrl, description)
    }
    function handleBlurCategorie(e) {
        setEditCategorie(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, currentImageUrl, description)
    }
    function handleBlurImageUrl(e) {
        setEditImageUrl(false)
        onUpdate(docId, currentTitle, currentUrl, currentCategorie, currentImageUrl, description)
    }



    return (
        <>
            <div className="proyect-profile">
                <div key={docId}>
                    <div className="editable-page">
                        <div className="edit">
                            <div>{editUrl ? (<>
                                <input ref={urlRef} value={currentUrl} onChange={handleChangeUrl} onBlur={handleBlurUrl} />
                            </>) :
                                (<>
                                    <button onClick={handleEditUrl}>Edit Url</button>
                                    <a href={url} className="proyect-link"><h2>{url}</h2></a>
                                </>)}
                            </div>
                            <div>{editImageUrl ? (<>
                                <input ref={imageRef} value={currentImageUrl} onChange={handleChangeImageUrl} onBlur={handleBlurImageUrl} />
                            </>) :
                                (<>
                                    <button onClick={handleEditImageUrl}>Edit Image</button>
                                    <a href={imageUrl} className="proyect-link"><img className="img-proyect" src={imageUrl} alt="Logo" /></a>
                                </>)}
                            </div>
                        </div>
                        <div className="edit">
                            <div>{editTitle ? (<>
                                <input ref={titleRef} value={currentTitle} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
                            </>) : (<>
                                <button onClick={handleEditTitle}>Edit Title</button>
                                <h2>{title}</h2>
                            </>)}
                            </div>
                        </div>
                        <div className="edit">
                            <div>{editCategorie ? (<>
                                <input ref={categorieRef} value={currentCategorie} onChange={handleChangeCategorie} onBlur={handleBlurCategorie} />
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