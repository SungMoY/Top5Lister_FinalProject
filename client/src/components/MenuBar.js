import { Grid } from "@mui/material"
import { Container } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import { TextField } from "@mui/material";

export default function MenuBar() {
    return (
        <Container sx={{flexGrow:1}} maxWidth="xl">
            <Grid container spacing={3} sx={{ml:-5}}>

                <Grid item xs={0}>
                    <HomeIcon sx={{fontSize:50}}/>
                </Grid>

                <Grid item xs={0}>
                    <GroupsIcon sx={{fontSize:50}}/>
                </Grid>

                <Grid item xs={0}>
                    <PersonIcon sx={{fontSize:50}}/>
                </Grid>

                <Grid item xs={0}>
                    <FunctionsIcon sx={{fontSize:50}}/>
                </Grid>

                <Grid item xs={0}>
                    <TextField size="large" sx = {{width:300, border:1}} />
                </Grid>

            </Grid>
        </Container>
    )
}