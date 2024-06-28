import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Chart from "react-apexcharts";

export default function PieChartPaper({ title, data }) {
    const ItemContainer = styled(Card)(({ theme }) => ({
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

    const total = data.reduce((acc, item) => acc + item.count, 0); // Calculate total count

    const series = data.map(item => item.count);
    const percentages = series.map(item => {
        const percentage = (item / total) * 100;
        if (Math.round(percentage)!== 0){
            return Math.round(percentage);
        } 
        else if (item > 0){
            return 0.1
        }
        else {
            return 0
        }
    });
    const labels = data.map(item => (item.label.charAt(0).toUpperCase() + item.label.slice(1))); // Extracting labels from data
    const colors = data.map(item => (item.color))
    const options = {
        chart: {
            width: 380,
            type: 'donut',
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            show: false
        },
        labels: labels,
        colors: colors
    };

    return (
        <ItemContainer elevation={3}>
            <Stack spacing={2} padding={1} direction={{ md: 'column', lg: 'row' }} >
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    height="150"
                    width="100%"
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <Typography variant="h5">{title}</Typography>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Stack spacing={3} direction={"row"}>
                            <Stack alignItems={"center"} spacing={1} >
                                {colors.map((item, index) => (

                                    <Avatar sx={{ width: 15, height: 15, backgroundColor: item }} src="/broken-image.jpg" children=" " />
                                ))}
                            </Stack>
                            <Stack alignItems={"left"} spacing={.20} >
                                {labels.map((item, index) => (
                                    <Typography key={index} variant="subtitle2" sx={{ fontSize: 'inherit', lineHeight: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item}
                                    </Typography>))}
                            </Stack>
                            <Stack alignItems={"right"} spacing={0} >
                                {percentages.map((item, index) => (
                                    <Typography variant="subtitle2">{item !== 0.1 ? `${item}%` : `<1%`}</Typography>))}
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </ItemContainer>
    );
}