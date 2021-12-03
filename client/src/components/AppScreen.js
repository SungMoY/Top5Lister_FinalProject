import React, { useContext } from 'react'
import AuthContext from '../auth'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import MenuBar from './MenuBar';
import { Container } from '@mui/material';
import { Statusbar } from '.';

export default function AppScreen() {
    const { auth } = useContext(AuthContext);
    console.log("AUTH: ", auth)
    console.log("AppScreen auth.loggedIn: " + auth.loggedIn);
    console.log("AppScreen auth.guestMode: " + auth.guestMode);

    let textMsg = "blank"
    if (auth.loggedIn) {
        console.log("Logged In is true")
        textMsg = "Logged In"+auth.user.firstName+auth.user.lastName
    } else if (auth.guestMode) {
        console.log("Guest Mode is true")
        textMsg = "Guest Mode"
    }
    return (
        <div id="top5-workspace">
            <MenuBar/>
            <Statusbar/>
        </div>
    )
    /*
    if (auth.loggedIn) {
        return (
            <Box>
            <Typography>
                Logged In
            </Typography>
            </Box>
        )
    } else if (auth.guestMode) {
        return (
            <Box>
            <Typography>
                Guest Mode
            </Typography>
            </Box>
        )
    } else {
        return (
            <Box>
            <Typography>
                Error: This page should never be hit
            </Typography>
            </Box>
        )
    }
    */
}