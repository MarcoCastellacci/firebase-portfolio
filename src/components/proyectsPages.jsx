import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LiveHelpTwoToneIcon from '@mui/icons-material/LiveHelpTwoTone';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../styles/proyects.css'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(teal[600]),
    borderColor: teal[600],
    '&:hover': {
        backgroundColor: teal[800],
        color: teal[300],
    },
}));

export default function ProyectsPages({ proyects }) {

    return (
        <>{proyects.map((proyect, index) =>
            <Card key={index} sx={{ margin: ".5rem", backgroundColor: "transparent", color: "rgb(94, 119, 94)" }}>
                <CardActionArea>
                    <CardMedia
                        className='img-proyect'
                        component="img"
                        image={proyect.imageUrl}
                        alt={proyect.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {proyect.title}
                        </Typography>
                        <Typography variant="body2" color="rgb(152, 152, 152)">
                            {proyect.description ? (proyect.description.length > 40 ? proyect.description.substring(0, 40) + '...' : proyect.description) : ''}
                        </Typography>
                        <ColorButton>
                            <LiveHelpTwoToneIcon onClick={() => {
                                Swal.fire({
                                    title: `${proyect.title}`,
                                    text: `${proyect.description}`,
                                    width: 600,
                                    padding: '3em',
                                    color: 'rgb(94, 119, 94)',
                                    icon: 'info',
                                    backdrop: `rgba(152, 152, 152,0.4)`
                                })
                            }}
                            aria-label="show more" />
                        </ColorButton>
                    </CardContent>
                    <CardActions>
                        <ColorButton size="medium" variant="outlined" sx={{ color: "teal[300]" }}>
                            <Link to={proyect.url} target="_blank" className='link'>
                                Ver Mas
                            </Link>
                        </ColorButton>
                    </CardActions>
                </CardActionArea>
            </Card>)}
        </>
    );
}
