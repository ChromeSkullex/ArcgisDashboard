import './App.css';
import { actionTypes, appReducer } from './reducers/app';
import { signIn, signOut } from './utils/session';
import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { Box, CssBaseline, Paper, Grid } from '@mui/material';
import Hub from './components/Hub';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AccountManagement from './components/AccountManagement';
import Login from './components/Login';
import MapScreen from './components/Map';

function App({ previousSession, previousPortal }) {
  const [useOpen, setUseOpen] = useState(true);

  const [state, dispatch] = useReducer(appReducer, {
    session: previousSession,
    portal: previousPortal,
  });

  const { session, user, portal } = state;

  useEffect(() => {
    if (session && !user) {
      console.log("User input")
      session.getUser().then((newUser) => {
        dispatch({ type: actionTypes.setUser, user: newUser });
      });
    }
  }, [session, user]);

  const onSignIn = useCallback(() => {
    signIn()
      .then((newSession) => {
        dispatch({ type: actionTypes.setSession, session: newSession });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dispatch]);

  const onSignOut = useCallback(() => {
    dispatch({ type: actionTypes.signOut });
    signOut();
  }, []);

  return (

    <>    
    {!session && 
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Login  onSignIn={onSignIn}/>
      </Grid>
    </Grid>
    }
    {session && <Router>
      <CssBaseline />
      <NavigationBar onSignIn={onSignIn} onSignOut={onSignOut} user={user} useOpen={useOpen} setUseOpen={setUseOpen} />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: 'margin 0.3s',
            marginLeft: useOpen ? {md: '240px', sm:'0px'} : '0px',
            marginTop: '55px',
            width:  '100%',
          }}
        >
          <Routes>
            <Route path='/' element={<Hub session={session}/>} />
            <Route path='/account-table' element={<AccountManagement currentUser={user} session={session} portal={portal} />} />
            <Route path='/map' element={<MapScreen session={session} />} />
          </Routes>
        </Box>
      </Box>
    </Router>}
    </>

  );
}

export default App;
