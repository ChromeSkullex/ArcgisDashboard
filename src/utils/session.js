import { ArcGISIdentityManager } from "@esri/arcgis-rest-request";
import env from '../config/environment';
import Cookies from 'js-cookie';
import { request } from '@esri/arcgis-rest-request';

const SESSION_COOKIE_NAME = `${env.cookiePrefix}_session`;
const PORTAL_COOKIE_NAME = `${env.cookiePrefix}_portal`;
/**
 * sign in using OAuth pop up
 */
export function signIn() {
  const { clientId, portal } = env;
  return ArcGISIdentityManager.beginOAuth2({
    clientId,
    portal,
    popup: true,
    redirectUri: `${window.location.origin}/redirect.html`
  }).then(session => {
    // save session for next time the user loads the app
    saveSession(session);

    // saves portal id
    request(`https://quevera.maps.arcgis.com/sharing/rest/portals/self`)
    .then(newPortal => {
      savePortal(newPortal.id)
    }).catch(e=>{
      console.error(e)
    })


    return session;
  }).catch(e=>{
    console.error("Error has occured", e)
  });
}

/**
 * make sure the user is not logged in the next time they load the app
 */
export function signOut() {
  deleteSession();
  deletePortal();
  
}

/**
 * restore a previously saved session
 */
export function restoreSession() {
  const serializedSession = Cookies.get(SESSION_COOKIE_NAME);
  const session =
    serializedSession && ArcGISIdentityManager.deserialize(serializedSession);
  return session;
}

export function restorePortal() {
  const serializedPortal = Cookies.get(PORTAL_COOKIE_NAME);
  return serializedPortal
}

// save session & user for next time the user loads the app
function saveSession(session) {
  // get expiration from session
  const expires = session.tokenExpires;
  Cookies.set(SESSION_COOKIE_NAME, session.serialize(), { expires });
}

// delete a previously saved session
function deleteSession() {
  Cookies.remove(SESSION_COOKIE_NAME);
}
function deletePortal() {
  Cookies.remove(PORTAL_COOKIE_NAME);
}

function savePortal(portal){
  const expires = portal.tokenExpires;
  Cookies.set(PORTAL_COOKIE_NAME, portal, {expires})

}