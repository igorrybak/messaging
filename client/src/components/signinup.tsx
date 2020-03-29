import { apiUrl } from "@/config";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import * as React from "react";
import { render } from "react-dom";
import { Messages } from "./messages";

export function SignUpSignIn(props: { action: string }) {
    const buttonText = props.action === "signIn" ? "Sign in" : "Create account";
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <form noValidate autoComplete="off" onSubmit={sendUserData}>
            <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                autoFocus
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </form>
    );

    async function sendUserData(event: React.FormEvent<HTMLFormElement>) {
        const createUser = props.action === "signIn" ? false : true;

        event.preventDefault();

        try {
            if (username && password) {
                const authData = { username, password };
                console.log("Sending body: ", authData);

                let resp;
                if (createUser) {
                    resp = await axios.post(apiUrl + "/user", authData);
                } else {
                    resp = await axios.get(apiUrl + "/user", { params: authData });
                }

                console.log("Response: ", resp);

                if (resp.status == 200) {
                    render(<Messages username={username} />, document.getElementById("app"));
                } else {
                    throw new Error("Respone status: " + resp.status);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
