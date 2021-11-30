import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main:'#000000' //this is black so AccountCircleIcon in appBanner can be black
        },
        secondary: {
            main: '#fffec1'
        },
        biglettering: '#fffec1',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }
            }
        }
    },
    typography: {
        fontFamily: [
            'Outfit', 'sans-serif'
        ].join(',')
    }
})

export default theme