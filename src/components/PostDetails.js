import React from 'react';
import './PostDetails.css';
import { Link } from 'react-router-dom';

function PostDetails({post}) {
  return (
    <div className='postDetails'>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className='createdBy'>{post.createdBy}</p>
        <div >
            {post.tags.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetails