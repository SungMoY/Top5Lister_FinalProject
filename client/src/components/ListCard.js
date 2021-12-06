import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Button} from '@mui/material';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import { TextField } from '@mui/material';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [commentText, setCommentText] = useState("")
    const { idNamePair } = props;
    const [expanded, setExpanded] = useState(false)

    let guestDisable = false
    if (auth.guestMode) {
        guestDisable = true
    }

    //console.log("IDNAMEPAIR: ", idNamePair)

    async function handleDeleteList(event, id) {
        store.markListForDeletion(id);
    }

    function handleEditScreen(event, id) {
        //console.log("currentList is being set to: ", id)
        store.setCurrentList(id)
    }

    function handleExpanded(event, id) {
        if (auth.loggedIn) {
            if (!expanded && idNamePair.publish !== "unpublished" && idNamePair.username !== auth.user.username) {
                console.log("ADD VIEW REACHED")
                store.addView(id)
            }
        } else {
            if (!expanded && idNamePair.publish !== "unpublished") {
                console.log("ADD VIEW REACHED BY GUEST")
                store.addView(id)
            }
        }
        setExpanded(!expanded)
    }

    function handleChangeCommentText(event, id) {
        setCommentText(event.target.value)
    }

    function handleAddComment(event, id) {
        if (event.code === "Enter") {
            store.addComment(idNamePair._id, commentText)
            setCommentText("")
        }
    }

    function handleLikeList(event, id) {
        store.handleLike(idNamePair._id)
    }

    function handleDislikeList(event, id) {
        store.handleDislike(idNamePair._id)
    }

    // use this to present likes. NOT shown if list is unpublished
    let likeCount=idNamePair.likes.length

    // use this to present dislikes. NOT shown if list is unpublished
    let dislikeCount=idNamePair.dislikes.length

    // use this to get view count of current list
    let viewCount=idNamePair.views


    let pubdateString = idNamePair.publish
    let pubdateSplit = pubdateString.split(' ')
    let pubdateReturn = pubdateSplit[1]+" "+pubdateSplit[2]+", "+pubdateSplit[3] 

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
                Published: {pubdateReturn}
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
                <IconButton sx={{color:'black'}}
                disabled={guestDisable}
                onClick={handleLikeList}
                >
                    <ThumbUpOutlinedIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>
        </div>
    if (auth.user) {
        if (idNamePair.likes.includes(auth.user.username)) {
            LikeButton =
            <div>
            <Box sx={{p:1, position:'absolute', left:'70.2%', bottom:(expanded?'87.3%':'30%')}}>
                    <IconButton sx={{color:'black'}}
                    disabled={guestDisable}
                    onClick={handleLikeList}
                    >
                        <ThumbUpIcon sx={{fontSize:40}}/>
                    </IconButton>
                </Box>
            </div>
        }
    }
    
    let LikeCounter =
        <div>
        <Box sx={{p:1, position:'absolute', left:'74%', top:(expanded?'3%':'12%')}}>
            {likeCount}
        </Box>
        </div>

    let DislikeButton = 
        <div>
        <Box sx={{p:1, fontSize:15, position:'absolute', left:'81%', bottom:(expanded?'87.3%':'30%')}}>
            <IconButton sx={{color:'black'}}
            disabled={guestDisable}
            onClick={handleDislikeList}>
                <ThumbDownOutlinedIcon sx={{fontSize:40}}/>
            </IconButton>
        </Box>
        </div>
    if (auth.user) {
        if (idNamePair.dislikes.includes(auth.user.username)) {
            DislikeButton = 
            <div>
            <Box sx={{p:1, fontSize:15, position:'absolute', left:'81%', bottom:(expanded?'87.3%':'30%')}}>
                <IconButton sx={{color:'black'}}
                disabled={guestDisable}
                onClick={handleDislikeList}>
                    <ThumbDownIcon sx={{fontSize:40}}/>
                </IconButton>
            </Box>
            </div>
        }
    }

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

    /*
    <div id="list-selector-list" style={{maxHeight: '90%', overflow: 'scroll', overflowX:'hidden'}}>
        {
            listCard
        }
    </div>*/

    //console.log("COMMENTS: ", idNamePair.name, idNamePair.comments)
    
    let commentsList = ""
    if (expanded) {
        commentsList = 
            <List>
            {
                idNamePair.comments.map((comment, index) => (
                    <ListItem
                    key={index}
                    >
                        <Box>
                            {comment}
                        </Box>
    
                    </ListItem>
                ))
            }
            </List>;
        }

    let expandedContents =
        <Box sx={{mt:'1.5%', height:'77%', width:'97%', ml:'1.5%'}}>
            <Grid container sx={{height:'100%'}}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6} sx={{width:'100%', height:'100%'}}>
                    <Grid container id='expanded-card'>
                        <Grid item xs={1} sx={{border:1, borderColor:'transparent', mt:'2%'}}>
                            <Box className='expanded-number'>
                                1.
                            </Box>
                        </Grid>
                        <Grid item xs={11} sx={{border:1, borderColor:'transparent', mt:'2%'}}>
                            <Box className='expanded-item'>
                            {idNamePair.items[0]}
                            </Box>
                        </Grid>
                        
                        <Grid item xs={1} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-number'>
                                2.
                            </Box>
                        </Grid>
                        <Grid item xs={11} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-item'>
                            {idNamePair.items[1]}
                            </Box>
                        </Grid>

                        <Grid item xs={1} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-number'>
                                3.
                            </Box>
                        </Grid>
                        <Grid item xs={11} sx={{border:1, borderColor:'transparent'}}> 
                            <Box className='expanded-item'>
                            {idNamePair.items[2]}
                            </Box>
                        </Grid>

                        <Grid item xs={1} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-number'>
                                4.
                            </Box>
                        </Grid>
                        <Grid item xs={11} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-item'>
                            {idNamePair.items[3]}
                            </Box>
                        </Grid>

                        <Grid item xs={1} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-number'>
                                5.
                            </Box>
                        </Grid>
                        <Grid item xs={11} sx={{border:1, borderColor:'transparent'}}>
                            <Box className='expanded-item'>
                            {idNamePair.items[4]}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={6} sx={{height:'100%'}}>
                    <div id='expanded-comments'>

                        {commentsList}

                        <TextField
                            placeholder="Add commment" 
                            size="small" 
                            disabled={guestDisable}
                            sx={{ backgroundColor: "white", borderRadius:1, zIndex:1, width:500 }}
                            onChange = {handleChangeCommentText}
                            onKeyPress = {handleAddComment}
                            value = {commentText}
                        >
                        </TextField>

                    </div>
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