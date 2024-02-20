import { createSlice } from '@reduxjs/toolkit';
import { userData } from './users';

const initialState = {
  user: null,
  users: userData,
  selectedCustomer: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    loginUser: (state, action) => {
      const user = state.users.find(u => u.email === action.payload.email && u.password === action.payload.password);
      if (user) {
        state.user = user;
      } else {
        throw new Error('User not found');
      }
    },
    registerUser: (state, action) => {
      const user = state.users.find(u => u.email === action.payload.email);
      if (user) {
        throw new Error('User already exists');
      } else {
        const newUser = {
          id: state.users.length + 1,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          role: 'user'
        }
        state.users.push(newUser);
      }
    },
    getCustomer: (state, action) => {
      const customerId = action.payload;
      state.selectedCustomer = state.users.find(user => user.id === parseFloat(customerId))
    },
    editCustomer: (state, action) => {
      const { id, data } = action.payload;
      const index = state.users.findIndex(obj => obj.id === parseFloat(id));
      state.users[index] = {
          id: parseFloat(id),
          username: data.username,
          email: data.email,
          password: data.password,
          role: state.users[index].role,
      };
    },
    deleteCustomer: (state, action) => {
      const customerId = action.payload;
      state.users = state.users.filter(user => user.id !== parseFloat(customerId))
  },
  },
});

export const { logout, loginUser, registerUser, getCustomer, editCustomer, deleteCustomer } = userSlice.actions;
export default userSlice.reducer;
