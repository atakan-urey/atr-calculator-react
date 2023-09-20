import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
  name: "appData",
  initialState: [] as any,
  reducers: {
    newItem: (state, actions) => {
      const id = state.length + 1;
      state.push({ id, ...actions.payload });
    },
    updateItem: (state, actions) => {
      const index = state.findIndex((item: any) => item.id === actions.payload.id);
      state[index] = actions.payload;
    },
    deleteItem: (state, actions) => {
      return state.filter((item: any) => item.id !== actions.payload);
    },
  },
});

export const { newItem, updateItem, deleteItem } = appDataSlice.actions;

export default appDataSlice.reducer;
