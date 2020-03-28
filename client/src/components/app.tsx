import * as React from "react";
import { SignUpSignIn } from "./signinup";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";

export const App = () => {
    return (
        <React.Fragment>
            <Button key="signIn" variant="contained" color="primary" onClick={() => logInSignUp("signIn")}>
                Sign in
            </Button>
            <Button key="createAccount" variant="contained" color="secondary" onClick={() => logInSignUp("createAccount")}>
                Create account
            </Button>
        </React.Fragment>
    );

    function logInSignUp(action: string) {
        render(<SignUpSignIn action={action} />, document.getElementById("app"));
    }
};
