import React from 'react';
import { Link } from 'react-router-dom';


export const Post = ({ post, singlePost }) => (
  <article className={singlePost ? "post-excerpt": "post"}>
    <h2>{post.title}</h2>
    <p>{singlePost ? post.body.substring(0, 100) : post.body}</p>
    {singlePost && (
      <Link to={`/posts/${post.id}`} className="button">
        View Post
      </Link>
    )}
  </article>
)