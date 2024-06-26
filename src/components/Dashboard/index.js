import React, { useCallback, useEffect, useState } from "react";
import { queryFeatures } from "@esri/arcgis-rest-feature-service";

export default function Dashboard({ session, currentUser, portal }) {
    const [jobTypes, setJobTypes] = useState({
        installation: 0,
        inspection: 0,
        repair: 0,
        count: 0,
    });

    const fetchLayerInfo = useCallback(() => {
        console.log(currentUser, portal);
        if (portal) {
            console.log("Fetching users from id", session);

            const queryJobType = (jobType) => {
                return queryFeatures({
                    url: "https://services.arcgis.com/wp8Bqxl30rb9yevs/arcgis/rest/services/random_assignments/FeatureServer/0/",
                    where: `job_type = '${jobType}'`,
                    authentication: session,
                    returnCountOnly: true,
                }).then(response => response.count);
            };

            Promise.all([
                queryJobType('installation'),
                queryJobType('repair'),
                queryJobType('inspection'),
            ]).then(([installationCount, repairCount, inspectionCount]) => {
                setJobTypes(prevJobTypes => ({
                    ...prevJobTypes,
                    installation: installationCount,
                    repair: repairCount,
                    inspection: inspectionCount,
                }));
                console.log({ installationCount, repairCount, inspectionCount });
            }).catch(e => {
                console.error(e);
            });
        } else {
            console.log("Portal is not defined.");
        }
    }, [currentUser, portal, session]);

    useEffect(() => {
        console.log("Here");
        fetchLayerInfo();
    }, [fetchLayerInfo]);

    return (
        <>
            <p>Installation: {jobTypes.installation}</p>
            <p>Repair: {jobTypes.repair}</p>
            <p>Inspection: {jobTypes.inspection}</p>
        </>
    );
}
