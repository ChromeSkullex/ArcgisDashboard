import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Drawer, List, ListItem, Box, ListItemButton, ListItemText, CssBaseline, Icon } from "@mui/material";
import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';


export default function NavigationBar({ onSignIn, onSignOut, user, useOpen, setUseOpen }) {
    const drawerWidth = 240;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" sx={{ mr: '20px', display: { md: 'none' } }} onClick={() => setUseOpen(!useOpen)}><MenuIcon /></IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ArcGIS API App
                    </Typography>
                    {user &&
                        <>
                            <IconButton color="inherit">
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Button color="inherit">Help</Button>
                            <Button color="inherit" onClick={onSignOut}>Log Out</Button>
                        </>}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="persistent"
                anchor="left"
                open={useOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box>
                    <List sx={{ color: '#6c757d' }}>
                        <ListItem>
                            <ListItemButton onClick={() => { navigate('/') }}>
                                <HomeOutlinedIcon sx={{ mr: '10px' }} />
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => { navigate('/dashboard') }}>
                                <SpaceDashboardOutlinedIcon sx={{ mr: '10px' }} />
                                <ListItemText primary={"Dashboard"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => { navigate('/map') }}>
                                <MapOutlinedIcon sx={{ mr: '10px' }} />

                                <ListItemText primary={"Map"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => { navigate('/account-table') }}>
                                <PeopleOutlineIcon sx={{ mr: '10px' }} />

                                <ListItemText primary={"Users"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
