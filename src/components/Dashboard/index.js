import React, { useCallback, useEffect, useState } from "react";
import { queryFeatures } from "@esri/arcgis-rest-feature-service";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PieChartPaper from "./PieChartPaper";
import jobMocks from "../../test/mocks/jobMocks.json";
import { Paper, Stack } from "@mui/material";
import TablePaper from "./TablePaper";
import FCICard from "./FCICard";
import ResponseCard from "./ResponseCard";

export default function Dashboard({ session, currentUser, portal }) {
    const [jobTypeData, setJobTypeData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const progressData = [
        { label: 'not Started', count: jobMocks.filter(job => job.status === "not started").length, color: "#BCC1CD" },
        { label: 'in Progress', count: jobMocks.filter(job => job.status === "in progress").length, color: "#EAB839" },
        { label: 'Review', count: jobMocks.filter(job => job.status === "review").length, color: "#1976D2" },
        { label: 'Completed', count: jobMocks.filter(job => job.status === "complete").length, color: "#89CD73" },
    ]
    const fetchLayerInfo = useCallback(() => {
        if (portal) {
            const queryJobType = (jobType) => {
                return queryFeatures({
                    url: "https://services.arcgis.com/wp8Bqxl30rb9yevs/arcgis/rest/services/random_assignments/FeatureServer/0/",
                    where: `job_type = '${jobType}'`,
                    authentication: session,
                    returnCountOnly: true,
                }).then(response => response.count);
            };

            const queryPriority = (priority) => {
                return queryFeatures({
                    url: "https://services.arcgis.com/wp8Bqxl30rb9yevs/arcgis/rest/services/random_assignments/FeatureServer/0/",
                    where: `priority = '${priority}'`,
                    authentication: session,
                    returnCountOnly: true,
                }).then(response => response.count);
            };

            Promise.all([
                queryPriority('low'),
                queryPriority('medium'),
                queryPriority('high'),
            ]).then(([lowCount, mediumCount, highCount]) => {
                setPriorityData([
                    { label: 'low', count: lowCount, color: "#89CD73" },
                    { label: 'medium', count: mediumCount, color: "#EAB839" },
                    { label: 'high', count: highCount, color: "#E24D42" }
                ]);
            }).catch(e => {
                console.error(e);
            });

            Promise.all([
                queryJobType('installation'),
                queryJobType('repair'),
                queryJobType('inspection'),
            ]).then(([installationCount, repairCount, inspectionCount]) => {
                setJobTypeData([
                    { label: 'installation', count: installationCount, color: "#1976D2" },
                    { label: 'repair', count: repairCount, color: "#F2A5FF" },
                    { label: 'inspection', count: inspectionCount, color: "#9DF7FD" }
                ]);
            }).catch(e => {
                console.error(e);
            });
        } else {
            console.error("Portal is not defined.");
        }
    }, [currentUser, portal, session]);

    useEffect(() => {

        fetchLayerInfo();
    }, [fetchLayerInfo]);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <PieChartPaper title={"Job Type"} data={jobTypeData} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <PieChartPaper title={"Priority"} data={priorityData} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <PieChartPaper title={"Progress"} data={progressData} />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <TablePaper data={jobMocks} />
                </Grid>
                <Grid item xs={12} lg={3} style={{ height: '100%' }}>
                    <Grid container spacing={3} direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <Grid item xs={4} lg={12}>
                            <FCICard />
                        </Grid>
                        <Grid item xs={10} lg={12} style={{ height: '100%' }}>
                            <ResponseCard />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}
