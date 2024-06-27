import React from "react";
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";


export default function FCICard() {
    const CardContainer = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        [theme.breakpoints.up('sm')]: {
            height: '350px', // Adjusted height for small screens and above
        },
        [theme.breakpoints.up('lg')]: {
            height: '200px', // Adjusted height for large screens and above
        },
        height: '200px',
        boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));
    const series = [34.1, 56.1]

    const options = {
        chart: {
          height: 350,
          type: 'radialBar',
          fontFamily: "Plus Jakarta Sans, sans-serif"
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: true
          }
        }
      },
      labels: ["2024", "2023"],
      colors: ["#39CAEA", "#D9D9D9"]
    }

    return (
        <CardContainer>
            <Grid container>
                <Grid item xs={6}>

                    <Stack justifyContent="space-evenly" spacing={3}>
                        <Typography variant="h6">Overall FCI Score</Typography>
                        <Typography variant="h3">34.1%</Typography>
                        <Stack direction={'row'} spacing={2} justifyContent="space-evenly">
                            <Stack direction={'row'} spacing={2}  alignItems="center">
                                <Avatar sx={{ width: 15, height: 15, backgroundColor: "#D9D9D9" }} src="/broken-image.jpg" children=" " />
                                <Typography>2023</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}  alignItems="center">
                                <Avatar sx={{ width: 15, height: 15, backgroundColor: "#39CAEA" }} src="/broken-image.jpg" children=" " />
                                <Typography>2024</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <ReactApexChart 
                        options ={options}
                        series={series}
                        type="radialBar" 
                        height={350}
                    
                    />

                </Grid>
            </Grid>

        </CardContainer>
    )
}