import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import theme from '../theme';
import { ThemeProvider} from '@mui/material';
import { Button } from '@mui/material';

export default function SplashScreen() {
    return (
        <ThemeProvider theme={theme}>

        <Box
            sx={{
                width: "100%",
                height: "93%",
                background: 'linear-gradient(to top, #1c2f69, #8c93ca)'
            }}
        >
            <Box pt={6}></Box>

            <Typography align="center" variant="h2" color="common.white">
                Welcome to
            </Typography>

            <Typography align="center" variant="h1" color="biglettering">
                Top 5 Lister
            </Typography>

            <Button variant="contained" color="secondary" align="center">
                Register
            </Button>

            <Button variant="contained" color="secondary" align="center">
                Login
            </Button>

            <Button variant="contained" color="secondary" align="center">
                Continue as Guest
            </Button>
        </Box>

        </ThemeProvider>
    )
}