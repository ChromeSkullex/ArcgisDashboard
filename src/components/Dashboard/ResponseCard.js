import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Grid, Select, MenuItem } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import yearByJson from "../../test/mocks/yearByJson.json"
import performanceTime from "../../test/mocks/performanceTime.json"

export default function ResponseCard() {

    const [yearSelected, setYearSelected] = useState(2024)
    const years = [2020, 2021, 2022, 2023, 2024]
    const CardContainer = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: '100%',
        boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));

    const series = [{
        name: "PSC_Number",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]

    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'datetime',
        }
    }



    return (
        <CardContainer>
            <Grid container spacing={2} alignItems="center">
                <Grid item sm={12}>
                    <Grid container>
                        <Grid item sm={9}>
                            <Typography>Performance Time by Year</Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <Select
                                    value={yearSelected}
                                    onChange={(e) => setYearSelected(e.target.value)}
                                    size="small"
                                >
                                    {
                                        years.map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>

                                        ))
                                    }
                                </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>

                    <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={282}

                    />
                </Grid>

            </Grid>
        </CardContainer>
    )
}