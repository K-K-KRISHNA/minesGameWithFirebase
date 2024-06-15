import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/configFile";

interface UserType {
  userName: string;
  topScore: number;
}

interface NumSliceType {
  bombNums: number[];
  userSelections: number[];
  validNums: number[];
  isModalOpen: boolean;
  userDetails: UserType;
  toppers: UserType[];
}

const initialState: NumSliceType = {
  bombNums: [],
  userSelections: [],
  validNums: [],
  isModalOpen: false,
  userDetails: { userName: "", topScore: 0 },
  toppers: [],
};

export const settingUser = createAsyncThunk("settingUser", async () => {
  const userFromLocal = localStorage.getItem("activeUserName");
  const docRef = doc(db, "users", userFromLocal!);
  const response = await getDoc(docRef);
  if (response.exists()) {
    return response.data(); // if user exists returns his name and topScore
  } else {
    await setDoc(docRef, { userName: userFromLocal, topScore: 0 });
  }
  return { userName: userFromLocal, topScore: 0 };
});

export const updatingTopScore = createAsyncThunk(
  "updatingTopScore",
  async ({ userName, topScore }: UserType) => {
    const docRef = doc(db, "users", userName);
    return await setDoc(docRef, {
      userName,
      topScore,
    });
  }
);

export const updatingTopPerformers = createAsyncThunk(
  "topPerformers",
  async ({ userName, topScore }: UserType) => {
    const docRef = doc(db, "topPerformers", "topRankers");
    const response = await getDoc(docRef);
    if (response.exists()) {
      let results: UserType[] = response.data().topPerformers;
      console.log(results);
      let newResults = [...results, { userName, topScore }];
      newResults?.sort((a: UserType, b: UserType) => b.topScore - a.topScore);
      console.log(newResults);
      return await setDoc(docRef, { topPerformers: newResults });
    }
    return await setDoc(docRef, { topPerformers: [{ userName, topScore }] });
  }
);

export const getToppers = createAsyncThunk("gettingToppers", async () => {
  const docRef = doc(db, "topPerformers", "topRankers");
  const response = await getDoc(docRef);
  if (response.exists()) {
    let results: UserType[] = response.data().topPerformers;
    return results;
  }
});

const numSlice = createSlice({
  name: "NumberDetailsSlice",
  initialState,
  reducers: {
    settingBombs: (state) => {
      while (state.bombNums.length < 5) {
        let randomNum = Math.ceil(Math.random() * 30);
        if (!state.bombNums.includes(randomNum)) {
          state.bombNums.push(randomNum);
        }
      }
    },
    settingValidNums: (state) => {
      while (state.validNums.length < 30) {
        let randomNum = Math.ceil(Math.random() * 99);
        if (!state.validNums.includes(randomNum)) {
          state.validNums.push(randomNum);
        }
      }
    },
    clickHandler: (state, action: PayloadAction<number>) => {
      if (state.userSelections.includes(action.payload)) return;
      if (state.bombNums.includes(action.payload)) {
        state.isModalOpen = true;
        state.userSelections.push(action.payload);
      } else state.userSelections.push(action.payload);
    },
    replay: (state) => {
      state.bombNums = initialState.bombNums;
      state.isModalOpen = initialState.isModalOpen;
      state.userDetails = initialState.userDetails;
      state.userSelections = initialState.userSelections;
      state.validNums = initialState.validNums;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(settingUser.fulfilled, (state, action) => {
      state.userDetails.topScore = action.payload?.topScore;
      state.userDetails.userName = action.payload?.userName;
    });
    builder.addCase(updatingTopScore.fulfilled, (state) => {
      state.userDetails.topScore = state.userSelections.length - 1;
    });
    builder.addCase(getToppers.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.toppers = action.payload;
      console.log(action.payload);
    });
  },
});

export default numSlice.reducer;
export const { settingBombs, settingValidNums, clickHandler, replay } =
  numSlice.actions;
