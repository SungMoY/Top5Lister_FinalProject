import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Button, Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair } = props;
    const [text, setText] = useState(idNamePair.name);

    console.log("IDNAMEPAIR: ", idNamePair)

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        //console.log(text)

        if (text === undefined || text === "" || text.length === 0 ) {
            //console.log("text was undefined, changing it to:", idNamePair.name)
            setText(idNamePair.name)
            setText(idNamePair.name)
            setText(idNamePair.name)
            setText(idNamePair.name)
            //console.log("text is now: ", text)
            //console.log("text is now: ", text)
        }

        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleEditScreen(event, id) {
        store.setCurrentList(id)
    }

    //  use this to change background color based on published or not
    let backcolor='white'

    // use this to edit the list, changed to publish date if published, maybe use boolean condition to swap between the two?
    let edit="Edit"

    // use this to present likes. NOT shown if list is unpublished
    let likeCount=100

    // use this to present dislikes. NOT shown if list is unpublished
    let dislikeCount=100

    // use this to get view count of current list
    let viewCount=100

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginBottom: '15px', display: 'flex', p: 1, border:1, borderColor:'black', borderRadius:3, bgcolor:backcolor, height:100}}
            divider
        >
            <Box sx={{p:1, fontSize:25, fontWeight: 'bold', position:'absolute', top:'0%'}}>
                {idNamePair.name}
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', top:'37%'}}>
                By: {idNamePair.username}
            </Box>

            <Button sx={{p:1, fontSize:15, position:'absolute', left:'0%', top:'58%'}}
                onClick = {(event)=>{handleEditScreen(event, idNamePair._id)}}
            >
                {edit}
            </Button>

            <Box sx={{p:1, position:'absolute', left:'70.2%', bottom:'30%'}}>
                <IconButton sx={{color:'black'}}>
                    <ThumbUpOutlinedIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>

            <Box sx={{p:1, position:'absolute', left:'74%', top:'12%'}}>
                {likeCount}
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'81%', bottom:'30%'}}>
                <IconButton sx={{color:'black'}}>
                    <ThumbDownOutlinedIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'85%', top:'12%'}}>
                {dislikeCount}
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'75%', top:'57%'}}>
                Views: {viewCount}
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'92%', bottom:'35%'}}>
                <IconButton sx={{color:'black'}}>
                    <DeleteIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'92%', top:'35%'}}>
                <IconButton sx={{color:'black'}}>
                    <KeyboardDoubleArrowDownIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>

        </ListItem>

        return (
            cardElement
            );
    }

export default ListCard;

/*

ml:172, mt:6

<Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>


<Box sx={{ p: 1 }}>
    <IconButton onClick={handleToggleEdit} aria-label='edit'>
        <EditIcon style={{fontSize:'48pt'}} />
    </IconButton>
</Box>

<Box sx={{ p: 1 }}>
    <IconButton onClick={(event) => {
                handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
        <DeleteIcon style={{fontSize:'48pt'}} />
    </IconButton>
</Box>

*/