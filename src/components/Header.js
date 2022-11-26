import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  Switch,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
  },
});

const lightTheme = createTheme({});

const Header = () => {
  const [mode, setMode] = useState(lightTheme);
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [editID, seteditID] = useState(0);

  const theme = useTheme();

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === lightTheme ? darkTheme : lightTheme));
  };

  const addTask = (e) => {
    setTask(e.target.value);
  };

  const onSumbmitHandler = (e) => {
    e.preventDefault();

    if (editID) {
      const editList = list.find((t) => t.id === editID);
      const updateList = list.map((t) =>
        t.id === editList.id ? (t = { id: t.id, task }) : t
      );
      setList(updateList);
      setTask("");
      seteditID(0);
      return;
    }

    if (task !== "") {
      setList([...list, { id: `${task}-${Date.now()}`, task }]);
      setTask("");
    }
  };

  const del = (id) => {
    setList(list.filter((t) => t.id !== id));
  };

  const edit = (id) => {
    const editTask = list.find((t) => t.id === id);
    setTask(editTask.task);
    seteditID(id);
  };

  return (
    <Box
      sx={{
        minHeight:"100vh",
        height: "max-content",
        backgroundColor: mode === darkTheme ? "#0d0d0d" : "#fff",
      }}
    >
      <ThemeProvider theme={mode}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <ThemeProvider theme={lightTheme}>
                {" "}
                <Switch color="default" onClick={toggleColorMode} />
              </ThemeProvider>
              <WbIncandescentIcon />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: "800",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "25px",
                  },
                }}
              >
                To-Do List
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            marginBottom: "30px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Task"
            variant="outlined"
            sx={{
              width: "45%",
              input: { color: mode === darkTheme ? "#fff" : "#000" },
              fontFamily: "Montserrat",
              [theme.breakpoints.down("md")]: {
                width: "55%",
              },
              "& label": {
                color: mode === darkTheme ? "#fff" : "#000",
              },
              "&:hover label": {
                fontWeight: 700,
              },
              "& label.Mui-focused": {
                color: mode === darkTheme ? "#fff" : "#000",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: mode === darkTheme ? "#fff" : "#000",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: mode === darkTheme ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: mode === darkTheme ? "#fff" : "#000",
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderColor: mode === darkTheme ? "#fff" : "#000",
                },
              },
            }}
            onChange={addTask}
            value={task}
          />
          <Button
            variant="contained"
            sx={{
              width: "140px",
              height: "45px",
              marginLeft: "18px",
              fontFamily: "Montserrat",
              fontWeight: 600,
              color: mode === darkTheme ? "#fff" : "#000",
              [theme.breakpoints.down("sm")]: {
                width: "32%",
                height: "35px",
                fontSize: "8px",
              },
            }}
            onClick={onSumbmitHandler}
            endIcon={
              <SendIcon
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    width: "15px",
                    height: "35px",
                  },
                }}
              />
            }
          >
            {editID ? "Edit" : "Add Task"}
          </Button>
          {/* <Button
          variant="contained"
          sx={{
            width: "160px",
            height: "45px",
            marginLeft: "18px",
            backgroundColor: "#497174",
          }}
          endIcon={<SearchIcon />}
        >
          Search Task
        </Button> */}
        </Box>

        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {list.map((t) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                border: "1px solid #000",
                borderRadius: "0.75rem",
                margin: "10px",
                padding: "14px 10px",
                backgroundColor: mode === darkTheme ? "#000" : "#42b9f5",
                color: mode === darkTheme ? "#fff" : "#000",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
              key={t.id}
            >
              <Box
                sx={{
                  flex: "1",
                  fontWeight: "Bold",
                  margin: "0px 12px",
                  textOverflow: "wrap",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  fontFamily: "Montserrat",
                }}
              >
                {t.task}
              </Box>
              <Box
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    margin: "0px 7px",
                    border: "0.5px solid #1f1f1f",
                    borderRadius: "1.2rem",
                    backgroundColor: "#eb4034",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    color: mode === darkTheme ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "9px",
                      margin: "0px 2px",
                      marginBottom: "4px",
                      padding: "4px",
                    },
                  }}
                  onClick={() => del(t.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    margin: "0px 7px",
                    borderRadius: "1.2rem",
                    backgroundColor: "#49ad5b",
                    border: "0.5px solid #1f1f1f",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    color: mode === darkTheme ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor: "green",
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "9px",
                      margin: "0px 2px",
                      padding: "4px",
                    },
                  }}
                  onClick={() => edit(t.id)}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          ))}
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default Header;
