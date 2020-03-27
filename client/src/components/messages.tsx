import { apiUrl } from "@/config";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as React from "react";
import { Message, User } from "../../../types";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const Messages = (props: { userData: User }) => {
    const classes = useStyles();
    const [messages, setMessages] = React.useState<Message[]>([]);

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

    function createNewMessage() {}

    return (
        <React.Fragment>
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
                        {messages.map(message => (
                            <TableRow key={message._id}>
                                <TableCell align="center">{message.from}</TableCell>
                                <TableCell align="center">{message.text}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};
