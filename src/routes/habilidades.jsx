import DashWrapper from '../components/dashboardWrapper';
import '../styles/skills.css'

function Habilidades() {

    const skills = [
        {
            name: 'Paciencia',
            image: 'https://cdn.bioguia.com/embed/d9cf62a6777382192386252d3828a28841524401878/4_pasos_para_seguir_cuando_estas_por_perder_la_paciencia_que_te_la_devolveran_de_inmediato?imagick=1&size=500',
            description: 'La paciencia es una virtud que se adquiere con el tiempo, pero que se pierde en un instante.',
            info: 'Con los años de experiencia acumulados, he aprendido a ser paciente conmigo mismo y con los demás. No siempre es fácil, pero es una virtud que me ha ayudado a crecer como persona y profesional.'
        },
        {
            name: 'Pasion',
            image: 'http://2.bp.blogspot.com/-qI-LAezbStw/VbuHvLmdZ1I/AAAAAAAAA7U/plqoiECfCvA/s1600/redes-sociales.gif',
            description: 'La pasión es generalmente asociado a un sentimiento tan profundo que desborda la frontera del dolor físico o psicológico.',
            info: 'Mi pasión es mi motor para seguir aprendiendo y creciendo como profesional. Amo profundamente lo que hago y me siento muy afortunado de poder dedicarme a ello.'
        },
        {
            name: 'Trabajo en Equipo',
            image: 'http://www.ricardosalinas.com/blog/images/fotoblogene2709.png',
            description: 'El trabajo en equipo es un proceso que se desarrolla a través de la interacción de un grupo de personas que trabajan juntas para alcanzar un objetivo común.',
            info: 'El trabajo en equipo es una de mis habilidades más sólidas. Disfruto colaborar con personas que me ayudan a crecer y mejorar como profesional.'
        },
        {
            name: 'Resiliencia',
            image: 'https://img.europapress.es/fotoweb/fotonoticia_20140316100133_800.jpg',
            description: 'La resiliencia es la capacidad de una persona para superar las adversidades y seguir adelante.',
            info: 'La resiliencia es una característica que he desarrollado a lo largo de los años al superar desafíos que parecían insuperables desde el principio.'
        },
        {
            name: 'Resolutivo',
            image: 'https://i.imgur.com/26ym3z9.jpg',
            description: 'La resolución de problemas es la fase que supone la conclusión de un proceso más amplio que tiene como pasos previos la identificación del problema y su modelado.',
            info: 'La resolución de problemas es esencial en mi carrera. Investigo y analizo detalladamente para abordar desafíos de manera efectiva. Encuentro soluciones innovadoras y tomo decisiones informadas en situaciones complejas. Mi enfoque proactivo y orientado a la resolución de problemas me impulsa a crecer profesionalmente.'
        }
    ]

    return (
        <>
            <DashWrapper>
                <div className="skills-container">
                    {skills.map((skill, index) => (
                        <div className="skills-card" key={index}>
                            <div className="innerCard">
                                <div className="frontSide">
                                    <div className="image-container">
                                        <img src={skill.image} alt={skill.name} />
                                    </div>
                                    <p className="title">{skill.name}</p>
                                    <p className="description">{skill.description}</p>
                                </div>
                                <div className="backSide">
                                    <p className="title">{skill.name}</p>
                                    <p className="info">{skill.info}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DashWrapper>
        </>
    );

}

export default Habilidades;