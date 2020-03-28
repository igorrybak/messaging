import { apiUrl } from "@/config";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as React from "react";
import { Message, User } from "../../../types";
import { NewMessage } from "./sendmessage";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export function Messages(props: { userData: User }) {
    const classes = useStyles();

    const [messages, setMessages] = React.useState<Message[]>([]);
    const [openNewMessage, setOpenNewMessage] = React.useState(false);

    React.useEffect(() => {
        async function getMessages() {
            try {
                const response = await axios.get<Message[]>(apiUrl + "/messages", {
                    params: { username: props.userData.username },
                });
                setMessages(response.data.map(item => item));
            } catch (error) {
                console.log("Error in getMessages: ", error);
            }
        }
        getMessages();
    }, []);

    function createNewMessage() {
        setOpenNewMessage(true);
    }
 
    return (
        <React.Fragment>
            <NewMessage open={openNewMessage} username={props.userData.username} />
            <Button variant="contained" color="primary" onClick={createNewMessage}>
                New message
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="messages table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">Text</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map(el => (
                            <TableRow key={el._id}>
                                <TableCell align="center">{el.sender}</TableCell>
                                <TableCell align="center">{el.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
