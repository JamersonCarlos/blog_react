import React, { useState } from 'react'
import './Login.css';
import { useAuthentication } from '../../hooks/useAuthentication';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const {login, error, loading} = useAuthentication();

    const handleSubmit = async (event) => { 
        event.preventDefault();

        const infoLogin = { 
            email, 
            password
        }

        await login(infoLogin);

        
    }

  return (
    <div className='login'>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form action="" onSubmit={handleSubmit} >
            <label htmlFor="">
                <span>E-mail</span>
                <input type="email" name='email' value={email} required placeholder='Digite seu E-mail' onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor="">
                <span>Senha</span>
                <input type="password" name='password' value={password} required  placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
            </label>
            {!loading && 
            <button className='btn' type='submit'> 
                Entrar
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

export default Login