import React from 'react'
import { useSearchParams, Link} from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';



function Search() {
    const [params] = useSearchParams();
    const {documents: posts, loading} = useFetchDocuments("posts", params);
  return (
    <div>
         <h1>Resultados encontrados para: {params}</h1>
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