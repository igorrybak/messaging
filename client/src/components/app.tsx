import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { render } from "react-dom";
import { SignUpSignIn } from "./signinup";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button key="signIn" variant="contained" color="primary" onClick={() => logInSignUp("signIn")}>
                Sign in
            </Button>
            <Button
                key="createAccount"
                variant="contained"
                color="secondary"
                onClick={() => logInSignUp("createAccount")}
            >
                Create account
            </Button>
        </div>
    );

    function logInSignUp(action: string) {
        render(<SignUpSignIn action={action} />, document.getElementById("app"));
    }
};
