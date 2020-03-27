import { apiUrl } from "@/config";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import * as React from "react";
import { render } from "react-dom";
import { Messages } from "./messages";

export const SignUpSignIn = (props: { action: string }) => {
    const buttonText = props.action === "signIn" ? "Sign in" : "Create account";
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <form noValidate autoComplete="off" onSubmit={requestToApi}>
            <TextField
                required
                id="userName"
                label="Username"
                variant="outlined"
                onChange={e => setUserName(e.target.value)}
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

    async function requestToApi(event: React.FormEvent<HTMLFormElement>) {
        const createUser = props.action === "signIn" ? false : true;

        event.preventDefault();

        try {
            if (userName && password) {
                const userData = { userName, password, createUser };
                console.log("Sending body: ", userData);

                const resp = await axios.post(apiUrl + "/user", userData);
                console.log("Response: ", resp);

                if (resp.status == 200) {
                    render(<Messages action={resp.data} />, document.getElementById("app"));
                } else {
                    throw new Error("Respone status: " + resp.status);
                }
            }
        } catch (error) {
            console.log("Error is occured:\n", error);
        }
    }
};
