import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store/store";
import { getToppers } from "../../Redux/slices/numSlice";

const TopList = () => {
  const toppers = useSelector((state: RootState) => state.numberSlice.toppers);
  return (
    <Paper
      sx={{
        width: { xs: "90%", sm: "45%" },
        overflowY: "auto",
        color: "white",
        maxHeight: "450px",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ backgroundColor: "#43766C" }}
        justifyContent={"space-between"}
        p={2}
        position={"sticky"}
        top={0}
      >
        <Typography variant="h6">Top Rankers</Typography>
        <Typography variant="h6">Score</Typography>
      </Stack>
      <Stack>
        {toppers.map((each, index) => (
          <Stack
            key={index}
            direction={"row"}
            justifyContent={"space-between"}
            color={"black"}
            p={1}
          >
            <Typography variant="h5">{each.userName}</Typography>
            <Typography variant="h6">{each.topScore}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopList;
