import React, { useContext } from 'react'
import AuthContext from '../auth'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';

export default function AppScreen() {
    const { auth } = useContext(AuthContext);
    console.log("AUTH: ", auth)
    console.log("AppScreen auth.loggedIn: " + auth.loggedIn);
    console.log("AppScreen auth.guestMode: " + auth.guestMode);

    let textMsg = "blank"
    if (auth.loggedIn) {
        console.log("Logged In is true")
        textMsg = "Logged In"
    } else if (auth.guestMode) {
        console.log("Guest Mode is true")
        textMsg = "Guest Mode"
    }
    return (
        <Box>
            <Typography>
                {textMsg}
            </Typography>
        </Box>
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