import React, { useEffect, useRef } from 'react'
import env from '../../config/environment';

import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config.js";
import WebMap from "@arcgis/core/WebMap.js";
import Cookies from 'js-cookie'

function MapScreen (session)  {
    const mapDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            let cookie_token = Cookies.get(`${env.cookiePrefix}_session`)
            cookie_token = JSON.parse(cookie_token)
             
            esriConfig.apiKey = cookie_token.token
            esriConfig.portalUrl = "https://quevera.maps.arcgis.com/"

            const webmap = new WebMap({
                portalItem: { // autocasts as new PortalItem()
                    id: "85a1bfd7c25e424c8ec515404845165a"
                }
            });
            const view = new MapView({
                container: mapDiv.current,
                map: webmap,
                center: [-77, 39],
                scale: 1000000
            });
            return () => view && view.destroy()

        }
    }, []);

    return <div className="mapDiv" ref={mapDiv} style={{ height: '80vh', width: "100%" }}></div>;
}

export default MapScreen;