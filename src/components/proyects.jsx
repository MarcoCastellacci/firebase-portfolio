import { useEffect, useRef, useState } from "react"
import '../styles/styles.css'



export default function Proyects({ docId, title, url, imageUrl, description, onDelete, onUpdate }) {
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentUrl, setCurrentUrl] = useState(url);

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);

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

    function handleDeleteProyect() {
        onDelete(docId)
    }

    function handleChangeTitle(e) {
        setCurrentTitle(e.target.value)
    }
    function handleChangeUrl(e) {
        setCurrentUrl(e.target.value)
    }
    function handleBlurUrl(e) {
        setEditUrl(false)
        onUpdate(docId, currentTitle, currentUrl, imageUrl, description)
    }
    function handleBlurTitle(e) {
        setEditTitle(false)
        onUpdate(docId, currentTitle, currentUrl, imageUrl, description)
    }

    return (
        <>
            <div className="proyect-profile">
                <div key={docId}>
                    <div>{editUrl ? (<>
                        <input ref={titleRef} value={currentUrl} onChange={handleChangeUrl} onBlur={handleBlurUrl} />
                    </>) :
                        (<>
                            <button onClick={handleEditUrl}>Edit</button>
                            <a href={url} className="proyect-link"><img className="img-proyect" src={imageUrl} alt="Logo de la Tienda" /></a>
                        </>)}
                    </div>
                    <div>{editTitle ? (<>
                        <input ref={urlRef} value={currentTitle} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
                    </>) : (<>
                        <button onClick={handleEditTitle}>Edit</button>
                        <h2>{title}</h2>
                    </>
                    )}
                    </div>
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <div>
                    <button onClick={handleDeleteProyect} className="btn-delete">Delete</button>
                </div>
            </div>
        </>
    )

}