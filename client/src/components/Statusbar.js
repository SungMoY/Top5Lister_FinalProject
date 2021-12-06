import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import AuthContext from '../auth'


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);


    function handleCreateNewList() {
        console.log("THIS IS AUTH WHEN MAKING NEW LIST:" ,auth)
        store.createNewList();
    }
    
    //Continue implementation of changing search into here
    let statusMSG = "Your Lists"
    if (store.currentPage) {
        statusMSG = store.currentPage
    }
    if (store.currentSearch) {
        statusMSG = store.currentSearch
    }

    let iconButton = ""
    if (store.currentPage === "HOME") {
        iconButton = 
        <IconButton onClick={handleCreateNewList}>
                <AddIcon sx={{color:'common.black', fontSize:75}}/>
            </IconButton>
    }

    let returnBar = ""
    returnBar =
        <Box id="top5-statusbar">
            {iconButton}
            <Typography variant="h2">{statusMSG}</Typography>
        </Box>

    return (
        <div>
        {returnBar}
        </div>
    )
}

export default Statusbar;