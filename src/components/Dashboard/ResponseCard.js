import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Grid, Select, MenuItem } from "@mui/material";
import ReactApexChart from "react-apexcharts";
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
    })); // Convert the performanceTime object to an array
    const performanceTimeArray = Object.values(performanceTime);

    const filteredData = performanceTimeArray.filter((data) => {
        const year = new Date(data.dateStarted).getFullYear();
        return year === yearSelected;
    });

    const series = [{
        name: "Response time",
        data: filteredData.map((data) => {
            return {
                x: new Date(data.dateStarted),
                y: data.responseTime.conductionResponse}
        })
    }];

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
            markers: {
              size: 0,
            },
            toolbar: {
              autoSelected: 'zoom'
            }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            // curve: 'straight'
        },
        yaxis: {
            labels: {
              formatter: function (val) {
                return (val).toFixed(0);
              },
            },
            title: {
              text: 'Response Time'
            },
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val).toFixed(0)
              }
            }
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
                        type="area"
                        height={282}

                    />
                </Grid>

            </Grid>
        </CardContainer>
    )
}