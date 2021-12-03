import React, { useContext } from 'react'
import AuthContext from '../auth'
import MenuBar from './MenuBar';
import { Statusbar } from '.';
import { GlobalStoreContext } from '../store'
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom'



export default function AppScreen() {
    
    const { store } = useContext(GlobalStoreContext);
    console.log(store.currentPage)

    const { auth } = useContext(AuthContext);
    console.log("AUTH: ", auth)
    console.log("AppScreen auth.loggedIn: " + auth.loggedIn);
    console.log("AppScreen auth.guestMode: " + auth.guestMode);

    const history = useHistory();
    if (!auth.loggedIn && !auth.guestMode) {
        history.push("/")
    }

    if (auth.loggedIn) {
        console.log("Logged In is true",auth.user.firstName+auth.user.lastName)
    } else if (auth.guestMode) {
        console.log("Guest Mode is true")
    }

    let contents="lists go here"
    switch (store.currentPage) {
        case "HOME":
            contents="HOME lists go here";
            break;
        case "USERS":
            contents="USERS lists go here";
            break;
        case "GROUP":
            contents="GROUP lists go here";
            break;
        case "COMMUNITY":
            contents="COMMUNITY lists go here";
            break;
        default:
            break;
    }

    return (
        <div id="top5-workspace">
            <MenuBar/>
            <Box>
                {contents}
            </Box>
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