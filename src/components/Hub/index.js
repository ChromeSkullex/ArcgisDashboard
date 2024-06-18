import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

export default function Hub() {

    const cardItems = [
        {
            key: 0,
            imgSrc: `${process.env.PUBLIC_URL}/assets/FLAG_MD_IAC.png`,
            link: 'https://maryland.maps.arcgis.com/home/index.html',
            title: 'Maryland ArcGIS Online',
            description: 'The homepage for Arcgis Online for Maryland.'
        },
        {
            key: 1,
            imgSrc: ``,
            link: 'https://quevera.maps.arcgis.com/home/organization.html',
            title: 'Organization Adminstration',
            description: 'Add, remove, and edit users in organization.'

        },
        {
            key: 2,
            imgSrc: `${process.env.PUBLIC_URL}/assets/ArcGIS_Workflow_Manager_220.png`,
            link: 'https://www.esri.com/en-us/arcgis/products/arcgis-workflow-manager/overview',
            title: 'Workflow Manager',
            description: 'Opens instructions for workflow manager.'

        },
        {
            key: 3,
            imgSrc: `${process.env.PUBLIC_URL}/assets/Survey123_for_ArcGIS_220-ba28fef2.png`,
            link: 'https://survey123.arcgis.com/surveys',
            title: 'Survey123',
            description: 'Survey123 manager to edit surveys.'

        },
        {
            key: 4,
            imgSrc: `${process.env.PUBLIC_URL}/assets/ArcGIS_logo.png`,
            link: 'https://maryland.maps.arcgis.com/home/gallery.html',
            title: 'Gallery',
            description: 'Gallery for ArcGIS Online for Maryland'

        }

    ]

    return (
        <>
            <Typography>The Hub</Typography>

            <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {cardItems.map(card => {
                        return (
                            <Grid item xs={2} sm={4} md={4} >
                                <Card sx={{ maxWidth: 345 }} key={card.key}>
                                    <CardActionArea onClick={() => window.open(card.link, "_blank")}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={card.imgSrc}
                                        />

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {card.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {card.description}
                                            </Typography>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>

                            </Grid>
                        )
                    })}

                </Grid>

            </Container>

        </>
    )

}