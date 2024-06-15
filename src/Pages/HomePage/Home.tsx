import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store/store";
import protectedRoute from "../../Components/protectedRoute";
import {
  settingBombs,
  settingUser,
  settingValidNums,
} from "../../Redux/slices/numSlice";
import loginProtection from "../../Components/loginProtection";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const clickHandler = () => {
    if (name.length === 0) alert("Enter Your Name");
    else {
      localStorage.setItem("activeUserName", name);
      navigate("/game");
    }
  };
  return (
    <Paper
      sx={{
        width: "400px",
        height: "150px",
        position: "absolute",
        m: "auto",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
      elevation={5}
    >
      <TextField
        variant="outlined"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={clickHandler}>
        <ArrowRightAltIcon />
      </Button>
    </Paper>
  );
};

export default loginProtection(Home);
