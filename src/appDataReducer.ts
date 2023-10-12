import { createSlice } from "@reduxjs/toolkit";
import { itemType } from "./FormModal";

const appDataSlice = createSlice({
  name: "appData",
  initialState: [] as itemType[],
  reducers: {
    newItem: (state, actions) => {
      const id = Date.now().toString();
      console.log(id);
      state.push({ id, ...actions.payload });
    },
    updateItem: (state, actions) => {
      const index = state.findIndex((item: itemType) => item.id === actions.payload.id);
      state[index] = actions.payload;
    },
    deleteItem: (state, actions) => {
      return state.filter((item: itemType) => item.id !== actions.payload);
    },
  },
});

export const { newItem, updateItem, deleteItem } = appDataSlice.actions;

export default appDataSlice.reducer;
