import React from "react";
import AccountTable from "./AccountTable";
import { Button, Container, Grid, Typography } from "@mui/material";
export default function AccountManagement ({ session, currentUser, portal }) {
    return (
        <>
        <Container>
                <Container>
                    <Typography variant="h4" sx={{'my': '30px'}}>Account Manager</Typography>
                    <Button variant="contained" sx={{mb:'15px'}} onClick={() => window.open('https://quevera.maps.arcgis.com/home/organization.html?view=table&sortOrder=desc&sortField=lastlogin#members', "_blank")}>Edit Users in ArcGIS</Button>
                </Container>
            <AccountTable currentUser={currentUser} session={session} portal={portal} />

        </Container>
        </>
    )

}