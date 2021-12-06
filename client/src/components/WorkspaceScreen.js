import { useContext, useState } from 'react'
import { Button } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';


//MAKE sure to update listBeingEdited in store to control menuBar and statusBar being greyed out/disabled

export default function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [name, setName] = useState(store.currentList.name);
    const [itemOne, setFirst] = useState(store.currentList.items[0]);
    const [itemTwo, setSecond] = useState(store.currentList.items[1]);
    const [itemThree, setThird] = useState(store.currentList.items[2]);
    const [itemFour, setFourth] = useState(store.currentList.items[3]);
    const [itemFive, setFifth] = useState(store.currentList.items[4]);

    function handleUpdateName(event) {
        setName(event.target.value);
    }
    function handleUpdateItemOne(event) {
        setFirst(event.target.value);
    }
    function handleUpdateItemTwo(event) {
        setSecond(event.target.value);
    }
    function handleUpdateItemThree(event) {
        setThird(event.target.value);
    }
    function handleUpdateItemFour(event) {
        setFourth(event.target.value);
    }
    function handleUpdateItemFive(event) {
        setFifth(event.target.value);
    }
    function handleSaveList(event) {
        let top5list = {
            name: name,
            items: [itemOne, itemTwo, itemThree, itemFour, itemFive],
            username: store.currentList.username,
            ownerEmail: store.currentList.ownerEmail,
            likes: store.currentList.likes,
            dislikes: store.currentList.dislikes,
            comments: store.currentList.comments,
            publish: store.currentList.publish,
            views: store.currentList.views
        }
        store.updateCurrentList(top5list)
    }
    function handlePublishList(event) {
        let today = new Date();
        let todayString = today.toDateString()
        let todaySplit = todayString.split(' ')
        let todayReturn = todaySplit[1]+" "+todaySplit[2]+", "+todaySplit[3] 

        let top5list = {
            name: name,
            items: [itemOne, itemTwo, itemThree, itemFour, itemFive],
            username: store.currentList.username,
            ownerEmail: store.currentList.ownerEmail,
            likes: store.currentList.likes,
            dislikes: store.currentList.dislikes,
            comments: store.currentList.comments,
            publish: todayReturn,
            views: store.currentList.views
        }
        store.updateCurrentList(top5list)
    }

    // this function should check if the user already has a list published with the same name
    // if there is no duplicate, return true
    function checkOwnPublishedDuplicates (listName) {
        let filtered = store.idNamePairs.filter(pair => pair.name === listName && pair.publish !== 'unpublished')
        if (filtered.length > 0) {
            return false
        } else {
            return true
        }
    }

    let disablePublish = true
    let itemsArray = [itemOne, itemTwo, itemThree, itemFour, itemFive]
    if (itemOne && itemTwo && itemThree && itemFour && itemFive) {
        if (!(new Set(itemsArray).size !== itemsArray.length)) {
            if (checkOwnPublishedDuplicates(name)) {
                disablePublish = false
            }
        }
    }


    return (
        <div id="top5-workspace-editing">
            <div id="workspace-edit">
            <TextField
                size="small" 
                sx={{ backgroundColor: "white", borderRadius:1, zIndex:1, width:500 }}
                onChange = {handleUpdateName}
                defaultValue={name}
                />
            <Grid container spacing={1} id="edit-numbering" >


                <Grid item xs={1}>
                    <Box className="item-number">
                        1.
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box className="top5-item">
                        <TextField
                            defaultValue={itemOne}
                            variant='standard'
                            sx={{zIndex:1, width:'99%', height:0, borderRadius:2, top:'1%', left:'1%'}}
                            inputProps={{style: {fontSize: "35pt", height: "50px"}}}
                            InputProps={{ disableUnderline: true }}
                            onChange = {handleUpdateItemOne}
                        />
                    </Box>
                </Grid>


                <Grid item xs={1}>
                    <Box className="item-number">
                        2. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box className="top5-item">
                        <TextField
                            defaultValue={itemTwo}
                            variant='standard'
                            sx={{zIndex:1, width:'99%', height:0, borderRadius:2, top:'1%', left:'1%'}}
                            inputProps={{style: {fontSize: "35pt", height: "50px"}}}
                            InputProps={{ disableUnderline: true }}
                            onChange = {handleUpdateItemTwo}
                        />
                    </Box>                
                </Grid>


                <Grid item xs={1}>
                    <Box className="item-number">
                        3. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box className="top5-item">
                        <TextField
                            defaultValue={itemThree}
                            variant='standard'
                            sx={{zIndex:1, width:'99%', height:0, borderRadius:2, top:'1%', left:'1%'}}
                            inputProps={{style: {fontSize: "35pt", height: "50px"}}}
                            InputProps={{ disableUnderline: true }}
                            onChange = {handleUpdateItemThree}
                        />
                    </Box>                
                </Grid>


                <Grid item xs={1}>
                    <Box className="item-number">
                        4. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box className="top5-item">
                        <TextField
                            defaultValue={itemFour}
                            variant='standard'
                            sx={{zIndex:1, width:'99%', height:0, borderRadius:2, top:'1%', left:'1%'}}
                            inputProps={{style: {fontSize: "35pt", height: "50px"}}}
                            InputProps={{ disableUnderline: true }}
                            onChange = {handleUpdateItemFour}
                        />
                    </Box>               
                </Grid>


                <Grid item xs={1}>
                    <Box className="item-number">
                        5. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box className="top5-item">
                        <TextField
                            defaultValue={itemFive}
                            variant='standard'
                            sx={{zIndex:1, width:'99%', height:0, borderRadius:2, top:'1%', left:'1%'}}
                            inputProps={{style: {fontSize: "35pt", height: "50px"}}}
                            InputProps={{ disableUnderline: true }}
                            onChange = {handleUpdateItemFive}
                        />
                    </Box>                
                </Grid>


            </Grid>
            </div>
                <Button
                    sx={{top:'88%', left:'75%', border:1, width:'7%', height:'9%', bgcolor:'#DDDDDD', fontSize:20}}
                    onClick={handleSaveList}
                >
                    Save
                </Button>
                <Button
                    disabled={disablePublish}
                    sx={{top:'88%', left:'79%', border:1, width:'7%', height:'9%', bgcolor:'#DDDDDD', fontSize:20}}
                    onClick={handlePublishList}
                    >
                    Publish
                </Button>
        </div>
    )
}