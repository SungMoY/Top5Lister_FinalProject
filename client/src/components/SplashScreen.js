import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import theme from '../theme';
import { ThemeProvider} from '@mui/material';
import { Button } from '@mui/material';
import Copyright from './Copyright';

export default function SplashScreen() {
    return (
        <ThemeProvider theme={theme}>

        <Box sx={{ width: "100%", 
                    height: "94.4%", 
                    background: 'linear-gradient(to top, #1c2f69, #8c93ca)'
                }}>

            <Box pt={15}></Box>

            <Typography align="center" variant="h3" color="common.white">
                Welcome to
            </Typography>

            <Typography align="center" variant="h1" color="biglettering">
                Top 5 Lister
            </Typography>
            
            <Box pt={8}></Box>

            <Box>
                <Button variant="contained" color="secondary" sx={{height: 75, width: 200, mx: 64}} href="/register">
                    Register
                </Button>
                <Button variant="contained" color="secondary" sx={{height: 75, width: 200, mx: -50}} href="/login">
                    Login
                </Button>
            </Box>

            <Box pt={6}></Box>

            <Box>
            <Button variant="contained" color="secondary" sx={{height: 38, width: 181, mx: 84.5}}>
                    Continue as Guest
                </Button>
            </Box>
                
            <Box>
            <Typography sx={{height: 38, width: 181, mt:"13%", ml:"2%"}} color="common.white" align="center">
                Sung Mo Yang <br/> Stony Brook University <br/> 2021
            </Typography>
            </Box>

        </Box>

        </ThemeProvider>
    )
}

/*
<MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            */