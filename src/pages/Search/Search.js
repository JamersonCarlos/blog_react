import React from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';
import { useQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';
import './Search.css';


function Search() {
    const query = useQuery();
    const search = query.get("q");

    const {documents: posts, loading} = useFetchDocuments("posts", search);
  return (
    <div className='searchResults'>
         <h1>Resultados encontrados para: {search}</h1>
        {posts && posts.map((post) => (
            <PostDetails post={post}/>
        )) }
        {posts && posts.length === 0 && (
            <div className='noposts'>
                <p>Não foram encontrados posts </p>
                <Link className='btn' to="/posts/create">Criar primeiro post</Link>
            </div>
        )}            
    </div>
  )
}

export default Search