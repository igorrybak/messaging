import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export const SignUpSignIn = (props: { action: string }) => {
    const buttonText = props.action === "sign-in" ? "Sign in" : "Create account";

    return (
        <form noValidate autoComplete="off" onSubmit={requestToServer}>
            <TextField id="standard-basic" label="Login" variant="outlined" />
            <TextField id="standard-basic" label="Password" variant="outlined" />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </form>
    );

    async function requestToServer(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resp = await axios.get("http://127.0.0.1:3000/api/")
        console.log(resp);
    }
};
