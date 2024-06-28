import React from "react";
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import yearByJson from "../../test/mocks/yearByJson.json"

export default function FCICard() {
    const CardContainer = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        // [theme.breakpoints.up('sm')]: {
        //     height: '350px', // Adjusted height for small screens and above
        // },
        // [theme.breakpoints.up('lg')]: {
        //     height: '200px', // Adjusted height for large screens and above
        // },
        // height: '200px',
        boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));

    const years = Object.keys(yearByJson);
    const data = years.map(year => ({
        year: year,
        mean: parseFloat(yearByJson[year].mean.toFixed(2))
    }));    
    console.log(data)
    const series = [data[2].mean,data[3].mean]

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
      labels: [data[3].year,data[2].year],
      colors: ["#39CAEA", "#B8B8BB"]
    }

    return (
        <CardContainer>
            <Grid container >
                <Grid item xs={6}>

                    <Stack justifyContent="space-evenly" spacing={2}>
                        <Box>
                            <Typography variant="h6">Overall FCI Score</Typography>
                            <Typography variant="subtitle2">Mean of 2023 and 2024</Typography>
                        

                        </Box>
                        <Typography variant="h3">{parseFloat((data[2].mean+data[3].mean)/2).toFixed(1)}%</Typography>
                        <Stack direction={'row'} spacing={2} justifyContent="space-evenly">
                            <Stack direction={'row'} spacing={2}  alignItems="center">
                                <Avatar sx={{ width: 15, height: 15, backgroundColor: "#B8B8BB" }} src="/broken-image.jpg" children=" " />
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
                        height={200}
                        width="100%"       
                    />

                </Grid>
            </Grid>

        </CardContainer>
    )
}