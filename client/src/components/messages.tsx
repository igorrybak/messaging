import { apiUrl } from "@/config";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as React from "react";
import { User, Message } from "../../../types";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
//     return { name, calories, fat, carbs, protein };
// };

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export const Messages = (props: { userData: User }) => {
    const classes = useStyles();
    const [messages, setMessages] = React.useState<Message[]>([]);

    React.useEffect(() => {
        async function getMessages() {
            try {
                const response = await axios.get<Message[]>(apiUrl + "/messages", {
                    params: props.userData.username,
                });
                setMessages(response.data.map(item => item));
            } catch (error) {
                console.log("Error in getMessages: ", error);
            }
        }
        getMessages();
    });

    return (
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
    );
};
