import React, { useContext } from 'react'
import AuthContext from '../auth'
import MenuBar from './MenuBar';
import { Statusbar } from '.';
import { GlobalStoreContext } from '../store'
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom'
import { ListCard } from '.';
import List from '@mui/material/List';
import { WorkspaceScreen } from '.';

export default function AppScreen() {
    
    const { store } = useContext(GlobalStoreContext);

    const { auth } = useContext(AuthContext);
    console.log("AppScreen auth.loggedIn: " + auth.loggedIn);
    console.log("AppScreen auth.guestMode: " + auth.guestMode);

    const history = useHistory();
    if (!auth.loggedIn && !auth.guestMode) {
        history.push("/")
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

    let listCard=""
    if (store) {
        listCard = 
            <List >
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                    />
                ))
            }
            </List>;
    }


    let contentRender = ""
    if (store.currentList) {
        contentRender =
            <WorkspaceScreen/>
    } else {
        contentRender = 
        <div id="list-selector-list">
        {
            listCard
        }
    </div>
    }

    return (
        <div id="top5-workspace">
            <MenuBar/>
            {contentRender}
            <Statusbar/>
        </div>
    )
}