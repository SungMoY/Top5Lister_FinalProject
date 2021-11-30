import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import theme from '../theme';
import { ThemeProvider} from '@mui/material';

export default function SplashScreen() {
    return (
        <ThemeProvider theme={theme}>

        <Box
            sx={{
                width: "100%",
                height: "93%",
            }}
        >
            <Typography align="center" variant="h2" color="common.white">
                Welcome to
            </Typography>

            <Typography align="center" variant="h1" color="biglettering">
                Top 5 Lister
            </Typography>
        </Box>

        </ThemeProvider>
    )
}