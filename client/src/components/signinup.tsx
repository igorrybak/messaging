import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { apiUrl } from "@/config";

export const SignUpSignIn = (props: { action: string }) => {
    const buttonText = props.action === "sign-in" ? "Sign in" : "Create account";
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <form noValidate autoComplete="off" onSubmit={requestToServer}>
            <TextField
                id="standard-basic"
                label="Username"
                variant="outlined"
                onChange={e => setUserName(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Password"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </form>
    );

    async function requestToServer(event: React.FormEvent<HTMLFormElement>) {
        const createUser = props.action === "sign-in" ? false : true;
        const params = { userName, password, createUser };
        
        event.preventDefault();

        try {
            const resp = await axios.get(apiUrl + "/messages", {
                params,
            });

            console.log("Response: ", resp.status);
        } catch (error) {
            console.log("Error is occured:\n", error);
        }

        console.log("Sending params: ", params);
    }
};
