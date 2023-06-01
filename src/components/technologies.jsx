import '../styles/tecnologies.css';



export default function Technos({ key, title, imageUrl, description }) {

    return (<>
        <div className="card-container bg-container" key={key}>
            <div className="card">
                <div className="img-content">
                    <img src={imageUrl} alt={`logo de la tecnologia ${title}`} />
                </div>
                <div className="content">
                    <p className="heading">{title}</p>
                    <p className='description'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </>)
}