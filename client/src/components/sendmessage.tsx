import { apiUrl } from "@/config";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import * as React from "react";

export function NewMessage(props: { open: boolean; username: string }) {
    const [message, setMessage] = React.useState("");
    const [recipient, setRecipient] = React.useState("");

    async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const resp = await axios.post(apiUrl + "/message", {
                recipient,
                sender: props.username,
                message,
            });
            console.log("Response: ", resp);

            if (resp.status == 200) {
                alert("TEST");
            } else {
                throw new Error("Respone status: " + resp.status);
            }
        } catch (error) {
            console.log("Error in NewMessage is occured:\n", error);
        }
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle id="simple-dialog-title">New message</DialogTitle>
            <form noValidate autoComplete="off" onSubmit={sendMessage}>
                <TextField
                    required
                    id="to"
                    label="To"
                    variant="outlined"
                    onChange={e => setRecipient(e.target.value)}
                />
                <TextField
                    required
                    id="message"
                    label="Message text"
                    variant="outlined"
                    onChange={e => setMessage(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Send message
                </Button>
            </form>
        </Dialog>
    );
}
