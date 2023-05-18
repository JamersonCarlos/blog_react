import './Dashboard.css'

import React from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from 'react-router-dom';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {documents: posts } = useFetchDocuments("posts", null, uid);
  const {deleteDocument} = useDeleteDocument("posts");
  console.log(posts)
  
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <p>Gerencie os seus posts</p>
      <div className='line'>
        <p>Título</p>
        <p>Ações</p>
      </div>
      {posts && posts.map((post) => (
        <div key={post.title} className='postConfig'>
          <p>{post.title}</p>
          <div className='buttons'>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
            <Link to={`/posts/update/${post.id}`} className='btn btn-outline'>Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard