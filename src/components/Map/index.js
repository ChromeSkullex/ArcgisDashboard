import React, { useEffect, useRef } from 'react'
import env from '../../config/environment';
import { signOut } from '../..//utils/session';

import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config.js";
import WebMap from "@arcgis/core/WebMap.js";
import Cookies from 'js-cookie'
import MapScreen from './MapScreen';
import { Button, ButtonGroup } from '@mui/material';

function MapPage(session) {
    const mapDiv = useRef(null);
    
    useEffect(() => {
        let cookie_token = Cookies.get(`${env.cookiePrefix}_session`)
        if (cookie_token) {
            cookie_token = JSON.parse(cookie_token)
        }
        else {
            signOut();

        }

    }, []);

    return (
        <>
            <MapScreen session={session}/>
            
        </>

    )
}

export default MapPage;