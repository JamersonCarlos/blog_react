import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import './UpdatePost.css';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const UpdatePost = () => {
    const {id} = useParams();
    const {document: post} = useFetchDocument("posts", id);
    const {updateDocument, response} = useUpdateDocument("posts");

    const [title, setTitle] = useState("");
    const [image, setUrlImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => { 
        if(post) { 
            setTitle(post.title);
            setUrlImage(post.image);
            setBody(post.body);

            const textTags = post.tags.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const navigate = useNavigate();
    
    
    const handleSubmit = (e) => { 
        e.preventDefault();

        setFormError("");
        // check values
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!");
        }

         // validate image
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }
        
        if(formError) return
        
        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        const data = { 
            title, 
            image, 
            body, 
            tags: tagsArray,
        }

        console.log(data)

        //Erro besta do caramba
        updateDocument(id, data);
        
        navigate("/dashboard");
        
    }    

  return (
    <div className='edit_post'>
        {
            post && (
                <>
                    <h1>Editando post: {post.title} </h1>
                    <p>Altere os dados do post como desejar</p>
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">
                            <span>Titulo:</span>
                            <input type="text" name='title' value={title} placeholder='Titulo' onChange={(e) => setTitle(e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>URL da imagem:</span>
                            <input type="text" name='url' value={image} placeholder='Url da imagem' onChange={(e) => setUrlImage(e.target.value)}/>
                        </label>
                        <h4>Preview da imagem atual</h4>
                        <img src={image} alt="" />
                        <label htmlFor="">
                            <span>Conteúdo</span>
                            <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Insira o conteúdo do post'></textarea>
                        </label>
                        <label htmlFor="">
                            <span>Tags</span>
                            <input type="text" name='tag' value={tags} placeholder='Tags' onChange={(e) => setTags(e.target.value)}/>
                        </label>
                        {!response.loading && <button className="btn">Atualizar!</button>}
                        {response.loading && (
                        <button className="btn" disabled>
                            Aguarde.. .
                        </button>
                        )}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )
        }
    </div>
  )
}

export default UpdatePost;