import { createSlice } from '@reduxjs/toolkit';

// OLD REDUCER
export const initialState = {
    comments: [],
    loading: false,
    hasErrors: false,
}


// OLD ACTION
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        getComments: (state) => {
            state.loading = true
        },
        getCommentsSuccess: (state, { payload }) => {
            state.loading = false
            state.comments = payload
            state.hasErrors = false
        },
        getCommentsFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        }
    }
});

// New actions
export const {getComments,getCommentsSuccess,getCommentsFailure} = commentsSlice.actions;

// Selector
export const commentsSelector = (state) => state.comments;

// New reducer
export default commentsSlice.reducer;


// Same as the blog without toolkit
// Combine them all in an asynchronous thunk
export function fetchComments(id) {
    return async (dispatch) => {
      dispatch(getComments())
  
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const data = await response.json();
        console.log(data);
        dispatch(getCommentsSuccess(data));
      } catch (error) {
        dispatch(getCommentsFailure());
      }
    }
  }