import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';

// Components
import { Post } from '../components/Post';
import {Comment} from '../components/Comment';

// Bring in the asynchronous fetchPosts action
import { fetchPost } from '../actions/postActions';
import { fetchComments } from '../actions/commentsActions';


// Redux state is now in the props of the component
const PostPage = ({dispatch, loading, post, hasErrors,comments }) => {
  const {id} = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(fetchComments(id));
    dispatch(fetchPost(id));
  }, [dispatch,id]);

  // Show loading, error, or success state
  const renderPost = () => {
    if (loading.post) return <p>Loading posts...</p>
    if (hasErrors.post) return <p>Unable to display posts.</p>
    return <Post post={post} />
  };

  const renderComments = () => {
    if (loading.comments) return <p>Loading comments...</p>
    if (hasErrors.comments) return <p>Unable to display comments.</p>
    return comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))
  };

  return (
    <section>        
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  )
};
  
  // Map Redux state to React component props
  const mapStateToProps = (state) => ({
    post: state.post.post,
    comments: state.comments.comments,
    loading: { post: state.post.loading, comments: state.comments.loading },
    hasErrors: { post: state.post.hasErrors, comments: state.comments.hasErrors },
  })
  // Connect Redux to React
  export default connect(mapStateToProps)(PostPage)