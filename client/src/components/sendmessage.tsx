import { apiUrl } from "@/config";
import { Button, TextField, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as React from "react";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function NewMessage(props: { isOpen: boolean; setIsOpen: (open: boolean) => void; username: string }) {
    const classes = useStyles();

    const [message, setMessage] = React.useState("");
    const [recipient, setRecipient] = React.useState("");

    const sendMessage = async () => {
        try {
            if (message && recipient) {
                const resp = await axios.post(apiUrl + "/message", {
                    recipient,
                    sender: props.username,
                    message,
                });
                console.log("Response: ", resp);

                if (resp.status == 200) {
                    props.setIsOpen(false);
                } else {
                    throw new Error("Respone status: " + resp.status);
                }
            }
        } catch (error) {
            console.log("Error in sendMessage:\n", error);
        }
    };

    const handleClose = () => props.setIsOpen(false);

    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="new-message-title">
                <DialogTitle id="new-message-title">New message</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="to"
                        label="To"
                        variant="outlined"
                        onChange={e => setRecipient(e.target.value)}
                    />
                    <br />
                    <TextField
                        required
                        id="message"
                        label="Message text"
                        variant="outlined"
                        multiline
                        onChange={e => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={sendMessage} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
