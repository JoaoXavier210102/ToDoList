import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../Services/api";

import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    makeStyles,
    Button,
    Snackbar,
    IconButton
} from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.dark
    },
    paper: {
        padding: "50px",
        backgroundColor: theme.palette.secondary.main,
    },
    login: {
        display: "grid",
        justifyContent: "center",
        maxWidth: "350px",
    },
    register: {
        textDecoration: "none", 
        color: theme.palette.primary.main
    }
}));

const Token = "@Token";

const LogIn = () => {


    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            handleSnackbar(true, "Preencha todos os campos!");
        } else {
            api.post("/auth/authenticate", { email, password }).then((response) => {
                localStorage.setItem(Token, response.data.token);
                navigate("/");
            }).catch((error) => {
                handleSnackbar(true, error.response.data.message);
            });
        }

    }

    const handleSnackbar = (value, message) => {
        setOpenSnackbar(value);
        setMessage(message);
    }

    return (
        <>
            <Snackbar
                open={openSnackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={3000}
                action={
                    <IconButton onClick={() => handleSnackbar(false)}>
                        <CloseIcon />
                    </IconButton>
                }
                message={message}
            />
            <Container className={classes.container} maxWidth={false} disableGutters>
                <Paper className={classes.paper} variant="outlined">
                    <form onSubmit={handleSubmit}>
                        <Grid container className={classes.login} spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className={classes.logo}>
                                <Typography variant="h4" align="center" style={{ marginLeft: "15px" }} color="primary">
                                    Log In
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Email"
                                            color="primary"
                                            fullWidth
                                            onChange={(item) => setEmail(item.target.value)}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Senha"
                                            type="password"
                                            color="primary"
                                            fullWidth
                                            onChange={(item) => setPassword(item.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className={classes.button}>
                                <Button variant="contained" size="medium" color="primary" fullWidth type="submit">Entrar</Button>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Link to="/register" className={classes.register}>
                                    <Typography>
                                        Não é registrado?
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default LogIn;