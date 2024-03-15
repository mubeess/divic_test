import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    setUser: state => {
      state.name = 'name';
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
