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
    register: {
        display: "grid",
        justifyContent: "center",
        maxWidth: "350px",
    },
    login: {
        textDecoration: "none",
        color: theme.palette.primary.main
    }
}));

const Register = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            handleSnackbar(true, "Preencha todos os campos!");
        } else {
            api.post("/auth/register", { name, email, password }).then(() => {
                navigate("/login")
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
                        <Grid container className={classes.register} spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className={classes.logo}>
                                <Typography variant="h4" align="center" style={{ marginLeft: "15px" }} color="primary">
                                    Register
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Nome"
                                            color="primary"
                                            fullWidth
                                            onChange={(i) => setName(i.target.value)}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Email"
                                            color="primary"
                                            fullWidth
                                            onChange={(i) => setEmail(i.target.value)}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Senha"
                                            type="password"
                                            color="primary"
                                            fullWidth
                                            onChange={(i) => setPassword(i.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className={classes.button}>
                                <Button variant="contained" size="medium" color="primary" fullWidth type="submit">Cadastrar</Button>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Link to="/login" className={classes.login}>
                                    <Typography>
                                        É registrado?
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

export default Register;