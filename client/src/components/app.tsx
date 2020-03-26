import * as React from "react";
import { SignUpSignIn } from "./signinup";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";

export const App = () => {
    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={() => logInSignUp("sign-in")}>
                Sign in
            </Button>
            <Button variant="contained" color="primary" onClick={() => logInSignUp("create-account")}>
                Create account
            </Button>
        </React.Fragment>
    );

    function logInSignUp(action: string) {
        render(<SignUpSignIn action={action} />, document.getElementById("app"));
    }
};
