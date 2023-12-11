import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state.users.push(payload);
    },
    removeUser: (state, action) => {
      const Item = state.users.indexOf(action.payload);
      console.log("Index", action.payload)

      state.users.splice(action.payload, 1)
      // if(Item > -1){
      //     state.users.splice(Item, 1)
      // }
      // console.log(state.users)
    },
  },
});

export const { addUsers, removeUser } = userSlice.actions;
export const getAllUsers = (state) => state.users;
export default userSlice.reducer;
