import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  createNewPost: false,
  confirmModalData: {
    show: false,
    title: '',
    message: '',
    actionOk: '',
  },
};

export const generalReducer = createSlice({
  name: 'general',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    createNewPost: (state) => {
      //Con el llamado cambiamos el valor del stado
      state.isLoading = !state.isLoading;
    },
    setConfirmModalData: (state, action) => {
      state.confirmModalData = action.payload;
    }
  },
});

export const { setIsLoading, createNewPost, setConfirmModalData } = generalReducer.actions;

export const isLoading = (state) => state.general.isLoading;
export const isNewPost = (state) => state.general.createNewPost;
export const confirmModalData = (state) => state.general.confirmModalData;

export default generalReducer.reducer;
