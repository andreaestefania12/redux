import { createSlice } from '@reduxjs/toolkit';

// OLD REDUCER
export const initialState = {
    post: {},
    loading: false,
    hasErrors: false,
}


// OLD ACTION
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPost: (state) => {
            state.loading = true
        },
        getPostSuccess: (state, { payload }) => {
            state.loading = false
            state.post = payload
            state.hasErrors = false
        },
        getPostFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        }
    }
});

// New actions
export const {getPost,getPostFailure,getPostSuccess} = postSlice.actions;

// Selector
export const postSelector = (state) => state.post;

// New reducer
export default postSlice.reducer;


// Same as the blog without toolkit
// Combine them all in an asynchronous thunk
export function fetchPost(id) {
    return async (dispatch) => {
      dispatch(getPost())
  
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        console.log(data);
        dispatch(getPostSuccess(data));
      } catch (error) {
        dispatch(getPostFailure());
      }
    }
  }