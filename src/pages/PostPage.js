import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

// Components
import { Post } from '../components/Post';
import {Comment} from '../components/Comment';

// Bring in the asynchronous fetchPosts action from slices
import { fetchPost, postSelector } from '../slices/post';
import { fetchComments, commentsSelector } from '../slices/comments';


// Redux state is now in the props of the component
const PostPage = () => {
  const dispatch = useDispatch();
  const { post, loading: postLoading , hasErrors: postHasErrors } = useSelector(postSelector);
  const { comments, loading: commentsLoading , hasErrors: commentsHasErrors } = useSelector(commentsSelector);
  const {id} = useParams();
  useEffect(() => {
    dispatch(fetchComments(id));
    dispatch(fetchPost(id));
  }, [dispatch,id]);

  // Show loading, error, or success state
  const renderPost = () => {
    if (postLoading) return <p>Loading post...</p>
    if (postHasErrors) return <p>Unable to display post.</p>
    return <Post post={post} />
  };

  const renderComments = () => {
    if (commentsLoading) return <p>Loading comments...</p>
    if (commentsHasErrors) return <p>Unable to display comments.</p>
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
  
export default PostPage;