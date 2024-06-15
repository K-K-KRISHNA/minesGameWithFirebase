import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import EachBox from "./EachBox";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store/store";
import {
  getToppers,
  settingBombs,
  settingUser,
  settingValidNums,
} from "../../Redux/slices/numSlice";
import Popup from "./Popup";
import NavBar from "../../Components/NavBar";
import TopList from "./TopList";
import protectedRoute from "../../Components/protectedRoute";

const Game = () => {
  const { validNums, isModalOpen, userSelections } = useSelector(
    (state: RootState) => state.numberSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(settingUser());
    dispatch(settingBombs());
    dispatch(settingValidNums());
  }, []);

  useEffect(() => {
    dispatch(getToppers());
  }, [isModalOpen]);

  return (
    <>
      <NavBar />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"space-around"}
        mt={2}
        width={"95%"}
      >
        <Paper
          sx={{
            width: { xs: "90%", sm: "45%" },
            height: "fit-content",
            p: 1,
            m: 2,
          }}
          elevation={5}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
            {validNums.map((each, index) => (
              <EachBox each={each} key={each} place={index + 1} />
            ))}
          </Box>
        </Paper>
        <TopList />
      </Stack>
      <Popup />
    </>
  );
};

export default protectedRoute(Game);
