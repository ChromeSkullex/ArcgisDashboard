import React from "react";
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import yearByJson from "../../test/mocks/yearByJson.json"


export default function ResponseCard(){
    const CardContainer = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: '100%',
        boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));
    

    return (
        <CardContainer>
            Hello
        </CardContainer>
    )
}