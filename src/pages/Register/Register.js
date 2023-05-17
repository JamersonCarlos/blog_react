import React from 'react'
import { useState, useEffect } from 'react';
import './Register.css';
import { useAuthentication } from '../../hooks/useAuthentication';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [error, setError] = useState("");

    const {createUser, error: authError, loading} = useAuthentication(); 

    const handleSubmit = async (e) => { 
        e.preventDefault();
      
        setError("");

        const user = { 
            name, 
            email, 
            password
        }

        if(password !== confirmPassword) { 
            setError("As senhas precisam ser iguais!");
            setConfirm("");
            setPassword("");
            return
        }

        const res = await createUser(user);
        console.log(res);
        
    }

    useEffect(() => { 
        if(authError) { 
            setError(authError);
        }
    }, [authError])
    
    
  return (
    <div className='register'>
        <h1>Cadastra-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <span>Nome: </span>
                <input type="text" name='displayname' required placeholder='Nome do usuário' value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="">
                <span>E-mail: </span>
                <input type="email" name='email' required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor="">
                <span>Senha: </span>
                <input type="password" name='password' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label htmlFor="">
                <span>Senha: </span>
                <input type="password" name='confirmPassword' required placeholder='Confirme a sua senha' value={confirmPassword}  onChange={(e) => setConfirm(e.target.value)}/>
            </label>
            {!loading && 
            <button className='btn' type='submit'> 
                Cadastrar
            </button>}
            {loading && 
            <button className='btn' type='submit' disabled> 
                Aguarde...
            </button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register