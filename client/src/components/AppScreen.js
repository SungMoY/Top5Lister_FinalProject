import React, { useContext } from 'react'
import AuthContext from '../auth'
import MenuBar from './MenuBar';
import { Statusbar } from '.';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import { ListCard } from '.';
import List from '@mui/material/List';
import { WorkspaceScreen } from '.';
import DeleteModal from './DeleteModal';

export default function AppScreen() {
    
    const { store } = useContext(GlobalStoreContext);

    const { auth } = useContext(AuthContext);
    //console.log("AppScreen auth.loggedIn: " + auth.loggedIn);
    //console.log("AppScreen auth.guestMode: " + auth.guestMode);
    //console.log("AppScreen idNamePairs: ", store.idNamePairs)

    const history = useHistory();
    if (!auth.loggedIn && !auth.guestMode) {
        history.push("/")
    }

    /*
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
    */

    let listCard=""
    if (store.currentPage === "COMMUNITY") {
        if (store.idNamePairs) {
            listCard = 
                <List sx={{right:'1%', ml:2, mt:'-1%'}}>
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
    } else {
        if (store.idNamePairs) {
            listCard = 
                <List sx={{right:'1%', ml:2, mt:'-1%'}}>
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
    }

    let contentRender = ""
    if (store.currentList) {
        contentRender =
            <WorkspaceScreen/>
    } else {
        contentRender = 
        <div id="list-selector-list" style={{maxHeight: '90%', overflow: 'scroll', overflowX:'hidden', top:'9%'}}>
        {
            listCard
        }
    </div>
    }

    return (
        <div id="top5-workspace">
            <DeleteModal/>
            <MenuBar/>
            {contentRender}
            <Statusbar/>
        </div>
    )
}