import React, { useState } from 'react'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';

function Home() {
    const [query, setQuery] = useState("");
    const {documents: posts, loading} = useFetchDocuments("posts");
    const navigate = useNavigate();

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        if(query) { 
            return navigate(`/search?q=${query}`);
        }
    }

  return (
    <div className='home'>
        <h1>Veja os nossos posts mais recentes</h1>
        <form action="" onSubmit={handleSubmit} className='searchForm'>
            <input type="text" placeholder='Busque por tags...' value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className='btn btn-dark' type='submit'>Pesquisar</button>
        </form>
        <div>
            <h1>Posts...</h1>
            {posts && posts.map((post) => (
                <PostDetails post={post}></PostDetails>
            )) }
            {posts && posts.length === 0 && (
                <div className='noposts'>
                    <p>Não foram encontrados posts </p>
                    <Link className='btn' to="/posts/create">Criar primeiro post</Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default Home