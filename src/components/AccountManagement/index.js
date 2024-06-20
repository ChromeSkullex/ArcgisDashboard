import React from "react";
import AccountTable from "../AccountTable";
import { Container, Typography } from "@mui/material";
export default function AccountManagement ({ session, currentUser, portal }) {
    return (
        <>
        <Container>
            <Typography>Account Manager</Typography>
            <AccountTable currentUser={currentUser} session={session} portal={portal} />

        </Container>
        </>
    )

}