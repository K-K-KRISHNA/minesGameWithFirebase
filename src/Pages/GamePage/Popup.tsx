import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store/store";
import ReplayIcon from "@mui/icons-material/Replay";
import { Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  getToppers,
  replay,
  settingBombs,
  settingUser,
  settingValidNums,
  updatingTopPerformers,
  updatingTopScore,
} from "../../Redux/slices/numSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Popup() {
  const navigate = useNavigate();
  const { isModalOpen, userSelections, userDetails } = useSelector(
    (state: RootState) => state.numberSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  const replayHandler = () => {
    dispatch(replay());
    dispatch(settingUser());
    dispatch(settingBombs());
    dispatch(settingValidNums());
  };
  const quitHandler = () => {
    dispatch(
      updatingTopScore({
        userName: userDetails.userName,
        topScore: userSelections.length - 1,
      })
    );
    dispatch(replay());
    localStorage.removeItem("activeUserName");
    navigate("/");
  };
  useEffect(() => {
    if (isModalOpen) {
      dispatch(
        updatingTopScore({
          userName: userDetails.userName,
          topScore: userSelections.length - 1,
        })
      );
      dispatch(
        updatingTopPerformers({
          userName: userDetails.userName,
          topScore: userSelections.length - 1,
        })
      );
    }
    // dispatch(getToppers());
  }, [isModalOpen]);

  return (
    <div>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game Over!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Score is {userSelections.length - 1}
          </Typography>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button
              color="success"
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={replayHandler}
            >
              Replay
            </Button>
            <Button
              color="warning"
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={quitHandler}
            >
              Quit
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
