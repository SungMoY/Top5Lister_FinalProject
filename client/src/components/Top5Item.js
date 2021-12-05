import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
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

    let { index } = props;

    let cardElement =    
        <TextField
            required
            fullWidth
            name="item"
            className="top5-item"
            id="top5-item"
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
            inputProps={{style: {fontSize: 48}}}
            InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
        />
    return (
        cardElement
    );
}

export default Top5Item;