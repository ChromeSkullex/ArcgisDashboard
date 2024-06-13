import { UserSession } from '@esri/arcgis-rest-auth';
import { ArcGISIdentityManager } from "@esri/arcgis-rest-request";
import env from '../config/environment';
import Cookies from 'js-cookie';
// import { ArcGISIdentityManager } from 'https://cdn.skypack.dev/@esri/arcgis-rest-request@4.0.0';

const SESSION_COOKIE_NAME = `${env.cookiePrefix}_session`;

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
