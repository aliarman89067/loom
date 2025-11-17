import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
  workspaces: {
    id: string;
    type: "PERSONAL" | "PUBLIC";
    name: string;
  }[];
};

const initialState: InitialStateProps = {
  workspaces: [],
};

export const Workspaces = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<InitialStateProps>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = Workspaces.actions;
export default Workspaces.reducer;
