import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Button} from '@mui/material';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { idNamePair } = props;
    const [expanded, setExpanded] = useState(false)

    //console.log("IDNAMEPAIR: ", idNamePair)

    async function handleDeleteList(event, id) {
        store.markListForDeletion(id);
    }

    function handleEditScreen(event, id) {
        //console.log("currentList is being set to: ", id)
        store.setCurrentList(id)
    }

    function handleExpanded(event, id) {
        if (!expanded && idNamePair.publish !== "unpublished" && idNamePair.username !== auth.user.username) {
            store.addView(id)
        }
        setExpanded(!expanded)
    }

    // use this to present likes. NOT shown if list is unpublished
    let likeCount=idNamePair.likes.length

    // use this to present dislikes. NOT shown if list is unpublished
    let dislikeCount=idNamePair.dislikes.length

    // use this to get view count of current list
    let viewCount=idNamePair.views


    //  publish or not ===> color change and edit/published button change
    let editOrPublished=
        <Button sx={{p:1, fontSize:15, position:'absolute', left:'0%', top:(expanded?'92%':'58%')}}
            onClick = {(event)=>{handleEditScreen(event, idNamePair._id)}}
        >
            Edit
        </Button>
    let backcolor='white'
    if (idNamePair.publish !== "unpublished") {
        backcolor = '#D4D4F5'
        editOrPublished =
            <Box sx={{p:1, fontSize:15, position:'absolute', top:(expanded?'93%':'62%')}}>
                Published: {idNamePair.publish}
            </Box>
    }

    let usernameBody =
        <div>
            <Box sx={{p:1, fontSize:15, position:'absolute', top:(expanded?'7.3%':'37%') }}>
                By: {idNamePair.username}
            </Box>
        </div>

    let LikeButton =
        <div>
        <Box sx={{p:1, position:'absolute', left:'70.2%', bottom:(expanded?'87.3%':'30%')}}>
                <IconButton sx={{color:'black'}}>
                    <ThumbUpOutlinedIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>
        </div>
    
    let LikeCounter =
        <div>
        <Box sx={{p:1, position:'absolute', left:'74%', top:(expanded?'3%':'12%')}}>
            {likeCount}
        </Box>
        </div>

    let DislikeButton = 
        <div>
        <Box sx={{p:1, fontSize:15, position:'absolute', left:'81%', bottom:(expanded?'87.3%':'30%')}}>
            <IconButton sx={{color:'black'}}>
                <ThumbDownOutlinedIcon sx={{fontSize:40}}/>
            </IconButton>
        </Box>
        </div>

    let DislikeCounter = 
        <div>
        <Box sx={{p:1, fontSize:15, position:'absolute', left:'85%', top:(expanded?'3%':'12%')}}>
            {dislikeCount}
        </Box>
        </div>

    let ViewCounter = 
        <div>
        <Box sx={{p:1, fontSize:15, position:'absolute', left:'76%', top:(expanded?'93%':'57%')}}>
            Views: {viewCount}
        </Box>
        </div>

    let DeleteButton = 
        <div>
        <Box sx={{p:1, fontSize:15, position:'absolute', left:'92%', bottom:(expanded?'87.3%':'35%')}}>
            <IconButton sx={{color:'black'}}
                onClick={(event)=> {handleDeleteList(event, idNamePair._id)}}
            >
                <DeleteIcon sx={{fontSize:40}}/>
            </IconButton>
        </Box>
        </div>


        //viewing own lists SHOULD NOT affect view count

    //home and published - show likes/dislikes and views
    //home and not published - show no likes/dislikes, show no views

    //not home so list must be published - show likes/dislikes

    if (store.currentPage === "HOME") {
        if (idNamePair.publish !== "unpublished") {
            // "Own views do not count" is handled in handleExpanded()
        } else {
           LikeCounter=null
           LikeButton=null
           DislikeCounter=null
           DislikeButton=null
           ViewCounter=null
        }
    } else {
       DeleteButton=null
    }

    let expandedContents =
        <Box sx={{border:1, mt:'1.5%', height:'77%', width:'97%', ml:'1.5%'}}>
            <Grid container sx={{height:'100%'}}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6} sx={{border:1, width:'100%', height:'100%'}}>
                    <Box
                        styles={{bgcolor:'#2C2F70'}}
                    >

                    </Box>
                </Grid>
                <Grid item xs={6} sx={{border:1,height:'100%'}}>
                    2.





                </Grid>
            </Grid>
        </Box>

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

            {usernameBody}

            {editOrPublished}

            {LikeButton}
            {LikeCounter}
            {DislikeButton}
            {DislikeCounter}
            {ViewCounter}
            {DeleteButton}

            <Box sx={{p:1, fontSize:15, position:'absolute', left:'92%', top:'35%'}}>
                <IconButton sx={{color:'black'}}
                    onClick={(event)=> {handleExpanded(event, idNamePair._id)}}
                >
                    <KeyboardDoubleArrowDownIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>

        </ListItem>

    let cardElementExpanded = 
        <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginBottom: '15px', display: 'flex', p: 1, border:1, borderColor:'black', borderRadius:3, bgcolor:backcolor, height:560}}
                divider
            >
                <Box sx={{p:1, fontSize:25, fontWeight: 'bold', position:'absolute', top:'0%'}}>
                    {idNamePair.name}
                </Box>

                {usernameBody}

                {editOrPublished}

                {LikeButton}
                {LikeCounter}
                {DislikeButton}
                {DislikeCounter}
                {ViewCounter}
                {DeleteButton}

                <Box sx={{p:1, fontSize:15, position:'absolute', left:'92%', top:'88%'}}>
                    <IconButton sx={{color:'black'}}
                        onClick={(event)=> {handleExpanded(event, idNamePair._id)}}
                    >
                        <KeyboardDoubleArrowUpIcon sx={{fontSize:40}}/>
                    </IconButton>
                </Box>

                {expandedContents}

            </ListItem>

        if (expanded) {
            return cardElementExpanded
        } else {
            return cardElement
        }
    }

export default ListCard;