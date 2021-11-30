import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main:'#000000' //this is black so AccountCircleIcon in appBanner can be black
        },
        biglettering: '#fffec1',
    }
})

export default theme