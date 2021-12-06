import { React, useContext } from "react";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import theme from '../theme';
import { ThemeProvider} from '@mui/material';
import { Button } from '@mui/material';
import AuthContext from '../auth'
import { useHistory } from "react-router";
import { GlobalStoreContext } from '../store'


export default function SplashScreen() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();

    console.log("AUTH: ", auth)

    function handleGuestModeClick() {
        store.loadIdNamePairsCOMMUNITY()
        auth.enableGuestMode()
        history.push("/app")
    }

    return (
        <ThemeProvider theme={theme}>        
        <Box
                sx={{  
                    background: 'linear-gradient(to top, #1c2f69, #8c93ca)',
                    pb:7.5,
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
                <Button variant="contained" color="secondary" sx={{height: 75, width: 200, mx: "32.75%"}} href="/register">
                <Typography variant="h5">
                    Register
                    </Typography>
                </Button>
                <Button variant="contained" color="secondary" sx={{height: 75, width: 200, mx: "-25%"}} href="/login">
                <Typography variant="h5">
                    Login
                    </Typography>
                </Button>
            </Box>

            <Box pt={6}></Box>

            <Box>
            <Button variant="contained" color="secondary" sx={{height: 38, width: 181, mx: '44.125%'}} onClick={handleGuestModeClick} >
                    <Typography variant="subtitle2">
                    Continue As Guest
                    </Typography>

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