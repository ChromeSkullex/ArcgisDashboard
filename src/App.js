import logo from './logo.svg';
import './App.css';
// import { Button } from 'react-bootstrap';
import { actionTypes, appReducer } from './reducers/app';
import { signIn, signOut } from './utils/session';
import React, { useReducer, useEffect, useCallback, useState } from 'react';
import * as portalTools from "@esri/arcgis-rest-portal"
import { request } from '@esri/arcgis-rest-request';
import {AppBar, Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// resource: https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-request/ArcGISIdentityManager/

function App({previousSession}) {
  
  var moment = require('moment');
  const tableHeader = [ 
    "Member", 
    "Email", 
    "Last Login", 
    "User Type", 
    "Role",
    ""
  ]
  const roleRef = {
    org_admin: "Adminstrator"
  }

  const [state, dispatch] = useReducer(appReducer, {
    session: previousSession
  });
  const [users, setUsers] = useState(null)

  const { session, user } = state;

  useEffect(() => {
    if (session && !user) {
      session.getUser().then(newUser => {
        dispatch({ type: actionTypes.setUser, user: newUser });
      });
    }
  }, [session]);

  const onSignIn = useCallback(() => {
    signIn().then(newSession => {
      dispatch({ type: actionTypes.setSession, session: newSession });
      
    });
  }, [dispatch]);
  useEffect(()=>{
    // setUsers(fetchUsers())
    fetchUsers()
    console.log(users, "e")
  }, [])

  const onSignOut = useCallback(() => {
    dispatch({ type: actionTypes.signOut });
    signOut();
  }, []);

  const fetchUsers = () =>{
    // console.log(portalTools.getUser(user?.username))
  request(`https://quevera.maps.arcgis.com/sharing/rest/portals/self`)
    .then(response=>{
      let portalId= response.id
      request(`https://quevera.maps.arcgis.com/sharing/rest/portals/${portalId}/users`, {authentication: session}).then(response=>{
        console.log(response)
        setUsers(response.users)
        return response.users
      }).catch((e=>{
        console.error(e)
      }))
    })
    .catch(e=>{
      console.error(e)
    })

  }
  function getRole(user){
    let userRole = user?.role
    request(``)
    return roleRef[userRole]
  }
  return (
    <>
    {/* {!user && 
    <Button onClick={onSignIn}>Sign in</Button>}
    {user &&
    <Button onClick={onSignOut}>Log out</Button>
    }/*/}
    <Button onClick={fetchUsers}>Call Users (See console log)</Button> 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ArcGIS API App
          </Typography>
          {!user &&
          <Button color="inherit" onClick={onSignIn}>Sign In</Button>}
          {user && 
            <Button color="inherit" onClick={onSignOut}>Log Out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((cell, index) => {
                if (index != 0){
                return (<TableCell align="right" key={cell}>{cell}</TableCell>)} 
                else {
                  return (<TableCell key={cell}>{cell}</TableCell>)
                }
              })}

            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((row, index)=>{
              return(
                <TableRow>
                  <TableCell component="th" scope="row">{row.fullName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{moment(row.lastLogin).format('MM/DD/yyyy')}</TableCell>
                  <TableCell align="right">{row.userType}</TableCell>
                  <TableCell align="right">{getRole(row)}</TableCell>
                  <TableCell align="right"><IconButton><MoreVertIcon /></IconButton></TableCell>
                  
                </TableRow>
              )
            })

            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    
    </>
  );
}

export default App;
