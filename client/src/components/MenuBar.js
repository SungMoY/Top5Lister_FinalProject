import React from 'react'
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { Grid, IconButton, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import AuthContext from '../auth'


export default function MenuBar() {

    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    let HomeButtonDisable=false
    const { auth } = useContext(AuthContext);
    if (auth.guestMode) {
        HomeButtonDisable=true
    }

    let homeButtonSx = {fontSize:50}
    let groupButtonSx = {fontSize:50}
    let usersButtonSx = {fontSize:50}
    let communityButtonSx ={fontSize:50}

    switch (store.currentPage) {
        case "HOME":
            homeButtonSx = {fontSize:50, border:3, borderColor:'#3AD713', mt:-0.25, ml:-0.25, borderRadius:16}
            break;
        case "USERS":
            usersButtonSx = {fontSize:50, border:3, borderColor:'#3AD713', mt:-0.25, ml:-0.25, borderRadius:16}
            break;
        case "GROUP":
            groupButtonSx = {fontSize:50, border:3, borderColor:'#3AD713', mt:-0.25, ml:-0.25, borderRadius:16}
            break;
        case "COMMUNITY":
            communityButtonSx = {fontSize:50, border:3, borderColor:'#3AD713', mt:-0.25, ml:-0.25, borderRadius:16}
            break;
        default:
            break;
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHomeButton = (event) => {
        store.loadIdNamePairsHOME()
    }
    const handleGroupButton = (event) => {
        store.loadIdNamePairsGROUP()
    }
    const handleUserButton = (event) => {
        store.loadIdNamePairsUSERS()
    }
    const handleCommunityButton = (event) => {
        store.loadIdNamePairsCOMMUNITY()
    }
    const sortByDateAscending = (event) => {
        console.log("Sorting By Date Ascending")
        store.sortByDateAscending()
        handleMenuClose()
    }
    const sortByDateDescending = (event) => {
        console.log("Sorting By Date Descending")
        store.sortByDateDescending()
        handleMenuClose()
    }
    const sortByViews = (event) => {
        console.log("Sorting By Views")
        store.sortByViews()
        handleMenuClose()
    }
    const sortByLikes = (event) => {
        console.log("Sorting By Likes")
        store.sortByLikes()
        handleMenuClose()
    }
    const sortByDislikes = (event) => {
        console.log("Sorting By Dislikes")
        store.sortByDislikes()
        handleMenuClose()
    }

    const handleUpdateText = (event) => {
        setText(event.target.value)
        store.resetSearch()
    }
    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            store.searchFunction(text)
        }
    }
    const handleResetSearch = (event) => {
        store.resetSearch()
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={0.6}>
                    <IconButton onClick={handleHomeButton} sx={{zIndex:1, mt:-1}} color="primary" disabled={HomeButtonDisable}>
                        <HomeIcon sx={homeButtonSx}/>
                    </IconButton>
                </Grid>

                <Grid item xs={0.6}>
                    <IconButton onClick={handleGroupButton} sx={{zIndex:1, mt:-1}} color="primary">
                    <GroupsIcon sx={groupButtonSx}/>
                    </IconButton>
                </Grid>
                    
                <Grid item xs={0.6}>
                    <IconButton onClick={handleUserButton} sx={{zIndex:1, mt:-1}} color="primary">
                    <PersonIcon sx={usersButtonSx}/>
                    </IconButton>
                </Grid>

                <Grid item xs={0.6}>
                    <IconButton onClick={handleCommunityButton} sx={{zIndex:1, mt:-1}} color="primary">
                    <FunctionsIcon sx={communityButtonSx}/>
                    </IconButton>
                </Grid>

                <Grid item xs={4}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        placeholder="Search" 
                        size="normal" 
                        sx={{ backgroundColor: "white",
                        borderRadius:1,
                        zIndex:1
                        }}
                        onChange = {handleUpdateText}
                        onKeyPress = {handleKeyPress}
                        onFocus = {handleResetSearch}
                        defaultValue={text}
                        />
                </Grid>

                <Grid item xs={4}/>

                <Grid item xs={1}>
                    <Typography align="center" sx={{fontSize:30}}> 
                        SORT BY
                    </Typography>
                </Grid>

            </Grid>

                <Box position='absolute' display='flex' justifyContent='right' sx = {{ width: '100%', top: '-1%'}}>
                    <IconButton
                        onClick={handleProfileMenuOpen}
                    >
                        <SortIcon color="primary" sx={{fontSize:50}}/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={sortByDateAscending}> Publish Date (Newest) </MenuItem>
                        <MenuItem onClick={sortByDateDescending}> Publish Date (Oldest) </MenuItem>
                        <MenuItem onClick={sortByViews}> Views </MenuItem>
                        <MenuItem onClick={sortByLikes}> Likes </MenuItem>
                        <MenuItem onClick={sortByDislikes}> Dislikes </MenuItem>
                    </Menu>
                </Box>
                </div>
    )
}