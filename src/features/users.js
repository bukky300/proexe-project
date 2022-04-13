import { createSlice } from "@reduxjs/toolkit";

// fetched initialState Data from the localStorage
let userData = [];

if (typeof window !== "undefined") {
  userData = JSON.parse(localStorage.getItem("users"));
}

export const userSlice = createSlice({
  name: "user",
  initialState: { value: userData },
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      state.value.push({
        id: state.value.length + 1,
        name: newUser.name,
        email: newUser.email,
      });
    },

    updateUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.email = action.payload.email;
        }
      });
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
