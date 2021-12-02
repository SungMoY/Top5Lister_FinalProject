import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
//import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';


export default function AppBanner() {

    const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn) {
        if (!loggedIn) {
            return (
                <ThemeProvider theme={theme}>

                <Button
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                >
                    <Box sx={{ m:2 }}>
                        <Box sx={{ m:1, width: '2.3rem', height: '2.5rem',}}>
                            <AccountCircleOutlinedIcon style= {{fontSize:40}} color="primary"/>
                        </Box>
                    </Box>
                </Button>
                </ThemeProvider>
            )
        } else {
            let initialsText = auth.user.firstName.charAt(0)+auth.user.lastName.charAt(0)
            return (
                <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
            >
                <Box sx={{ m:2 }}>
                    <Box sx={{ m:1, border:2, width: '1.7rem', height: '1.7rem', borderRadius: "50%", color:'black', bgcolor:"#D236DF"}}>
                        <Typography>
                            {initialsText}
                        </Typography>
                    </Box>
                </Box>

            </Button>
            )
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#e0e0e0' }} height="100">
                <Toolbar variant="dense">

                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: "#d4af37" }} to='/'>T<sup>5</sup>L</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1 }}>

                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, height:40}}>
                            { getAccountMenu(auth.loggedIn) }
                    </Box>

                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}