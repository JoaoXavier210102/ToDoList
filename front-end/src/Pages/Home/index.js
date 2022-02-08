import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../../Services/api";

import {
    Container,
    Typography,
    Grid,
    makeStyles,
    IconButton,
    Avatar,
    AppBar,
    Tooltip,
    Paper,
    TextField,
    Checkbox,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Snackbar,
    LinearProgress
} from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';


const Token = "@Token";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.primary.dark
    },
    profile: {
        display: "flex",
        alignItems: "center"
    },
    appBar: {
        padding: "10px",
        display: "flex",
        justifyContent: "space-around"
    }
}));

const LogIn = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [idUser, setIdUser] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        //Pegar informações gerais do usuário
        api.get("/user", { headers: { "access-token": localStorage.getItem(Token) } }).then((response) => {
            setName(response.data.user.name)
            setIdUser(response.data.user._id);
        }).catch((error) => {
            handleSnackbar(true, error.response.data.message);
            navigate("/login");
        });

    }, []);

    useEffect(() => {
        //pegar tarefas do usuário
        idUser && api.get(`/task/${idUser}`).then((response) => {
            setTasks(response.data);
        }).catch((error) => {
            if (error.response.data.message) {
                handleSnackbar(true, error.response.data.message);
            }
        })
    }, [idUser]);

    //Função para adicionar tarefas
    const handleTasks = () => {

        let addTask = {
            idUser,
            title,
            description
        }

        api.post("/task/add", addTask).then((response) => {
            handleSnackbar(true, response.data.message);
        }).catch((error) => {
            handleSnackbar(true, error.response.data.message);
        })

    }

    //Função para abrir o Snackbar
    const handleSnackbar = (value, message) => {
        setOpenSnackbar(value);
        setMessage(message);
    }

    //Função para trocar o status da tarefa
    const handleChecked = (value, idTask) => {

        api.put("/task/status", { idTask, value }).then((response) => {
            handleSnackbar(true, response.data.message);
        }).catch((error) => {
            handleSnackbar(true, error.response.data.message);
        });

        
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
                <AppBar position="relative">
                    <Grid container className={classes.appBar}>
                        <Grid item className={classes.profile}>
                            <Link to="/edit" >
                                <Tooltip title="Editar perfil" arrow>
                                    <Avatar src="https://avatars.githubusercontent.com/u/81498473?s=400&u=c1b50d13d84a173a1d13fd442357d116571f85cf&v=4" alt="perfil" />
                                </Tooltip>
                            </Link>
                            <Typography style={{ marginLeft: "10px", fontWeight: 600 }}>
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Link to="/">
                                <Tooltip title="Início" arrow>
                                    <IconButton color="secondary">
                                        <HomeIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Grid>
                        <Grid item >
                            <Link to="/login">
                                <Tooltip title="Sair" arrow>
                                    <IconButton color="secondary" onClick={() => { localStorage.removeItem(Token) }}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Grid>
                    </Grid>
                </AppBar>
                <Container maxWidth={false} style={{ display: "grid", justifyContent: "center" }}>
                    <Paper style={{ width: "500px", marginTop: "100px", padding: "30px" }}>
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item md={10}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Título"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => { setTitle(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Descrição"
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={2}>
                                <Tooltip title="Adicionar Tarefa">
                                    <IconButton color="primary" onClick={handleTasks}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Paper>
                    {tasks.map((item) => {
                        return (
                            <Accordion style={{ marginTop: "30px", width: "500px" }} key={item.title}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <Checkbox
                                        color="primary"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        onChange={(event) => handleChecked(event.target.checked, item._id)}
                                        checked={item.status}
                                    />
                                    <p>
                                        {item.title}
                                    </p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.description}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Tooltip title={new Date(item.createdAt).toLocaleString()}>
                                        <InfoIcon />
                                    </Tooltip>
                                    <Tooltip title="Deletar">
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </AccordionActions>
                            </Accordion>
                        )
                    })}
                </Container>
            </Container>
        </>
    )
}

export default LogIn;