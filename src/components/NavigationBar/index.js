import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Drawer, List, ListItem, Box, ListItemButton, ListItemText, CssBaseline } from "@mui/material";
import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export default function NavigationBar({ onSignIn, onSignOut, user, useOpen, setUseOpen }) {
    const drawerWidth = 240;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
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
                    <List>
                        <ListItem>
                            <ListItemButton onClick={() =>{navigate('/')}}>
                                <ListItemText primary={"Home"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
