import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';
import './Post.css';

function Post() {
    const {id} = useParams();
    const {document: post, loading } = useFetchDocument("posts", id);
    console.log(post);
  return (
    <div className='post'>
        {loading && <p>Carregando post...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p>{post.body}</p>
                <h3>Este post trata sobre: </h3>
                <div className='tags'>
                    {post && post.tags.map((tag) => (
                        <p key={tag}><span>#</span>{tag}</p>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Post