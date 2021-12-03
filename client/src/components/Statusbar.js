import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="text";
    if (store.currentList)
        text = store.currentList.name;
    return (
            <Typography id="top5-statusbar">{text}</Typography >
    
    );
}

export default Statusbar;