// Create Redux action types
export const GET_POST = 'GET_POST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

// Create Redux action creators that return an action
export const getPost = () => ({
    type: GET_POST,
  })
  
export const getPostSuccess = (post) => ({
    type: GET_POST_SUCCESS,
    payload: post,
  })
  
export const getPostFailure = () => ({
    type: GET_POST_FAILURE,
  })

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