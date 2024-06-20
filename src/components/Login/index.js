import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import React from "react";


export default function Login({ onSignIn}) {
    return (
        <>
            
            <Paper sx={{width: '50vh', padding: '50px'}} elevation={3}>
                <Grid container spacing={5} alignItems="center" justifyContent="center" direction="column">
                    <Grid item >
                        <Typography variant="h5">Log In to ArcGIS Portal</Typography>

                    </Grid>
                    <Grid item >
                        <img src={`${process.env.PUBLIC_URL}/assets/IAC-Logo.png`} />
                    </Grid>
                    <Grid item >
                        <Button variant="contained" onClick={onSignIn}>ArcGIS Login</Button>
                    </Grid>
                    <Grid item> 
                        <Typography variant="body2"         color="textSecondary"
                        >© Copyright 2024. (Prototype) Sazhelle GM - All rights reserved.</Typography>

                    </Grid>
                </Grid>
            </Paper>
        
        </>
    )
}