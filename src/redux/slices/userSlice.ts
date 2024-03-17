import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';

export interface UserType {
  name: string;
  image: string;
  token: string;
}

interface UserState {
  user: UserType;
}

const initialState: UserState = {
  user: {
    name: '',
    image: '',
    token: '',
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
