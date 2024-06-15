import { Stack, Typography } from "@mui/material";
import { GiStarProminences } from "react-icons/gi";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store/store";
import { clickHandler } from "../../Redux/slices/numSlice";

const EachBox = ({ each, place }: { each: number; place: number }) => {
  const { bombNums, userSelections } = useSelector(
    (state: RootState) => state.numberSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Stack
      m={0}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        border: "none",
        width: { xs: "50px", md: "75px" },
        height: { xs: "50px", md: "75px" },
        borderRadius: "5px",
        backgroundColor: "#AAD7D9",
        cursor: "pointer",
        ":hover": { backgroundColor: "#92C7CF" },
      }}
      onClick={() => dispatch(clickHandler(place))}
    >
      {!bombNums.includes(place) ? (
        <Typography
          variant="h5"
          sx={{ opacity: userSelections.includes(place) ? "1" : "0" }}
        >
          {each}
        </Typography>
      ) : (
        <GiStarProminences
          fontSize={"50px"}
          color="red"
          opacity={userSelections.includes(place) ? "1" : "0"}
        />
      )}
    </Stack>
  );
};

export default EachBox;
