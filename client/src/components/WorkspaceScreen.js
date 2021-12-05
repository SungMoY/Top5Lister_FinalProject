import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';


//MAKE sure to update listBeingEdited in store to control menuBar and statusBar being greyed out/disabled

export default function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");



    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" disablePadding>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }

    return (
        <div id="top5-workspace-editing">
            <div id="workspace-edit">
            <TextField 
                placeholder="Search" 
                size="small" 
                sx={{ backgroundColor: "white", borderRadius:1, zIndex:1, width:500 }}
                onChange = {handleUpdateText}
                onKeyPress = {handleKeyPress}
                defaultValue={store.currentList.name}
                />
            <Grid container spacing={1} id="edit-numbering" >



                <Grid item xs={1}>
                    <Box class="item-number">
                        1. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box class="top5-item">
                        {} again!
                    </Box>
                </Grid>




                <Grid item xs={1}>
                    <Box class="item-number">
                        2. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    Second Item
                </Grid>




                <Grid item xs={1}>
                    <Box class="item-number">
                        3. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    Third Item
                </Grid>




                <Grid item xs={1}>
                    <Box class="item-number">
                        4. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    Fourth Item
                </Grid>




                <Grid item xs={1}>
                    <Box class="item-number">
                        5. 
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    Fifth Item
                </Grid>




            </Grid>
            </div>
        </div>
    )
}