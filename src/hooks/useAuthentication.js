import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = () => { 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();
    

    //Evitando vazamento de memória
    function checkIfCancelled() {
        if (cancelled) { 
            return
        }
    }

    //New user
    const createUser = async (data) => { 
        checkIfCancelled();
        setError(null);
        setLoading(true);
        try {
            const {user} = await createUserWithEmailAndPassword (
                auth, 
                data.email, 
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })

            setLoading(false);

            return user;            

        } catch (error) {
            let systemErrorMessage;
            
            if(error.message.includes("password")) { 
                systemErrorMessage = "A senha precisa ter no mínímo 6 caracteres";
            } else if (error.message.includes("email-already")) { 
                systemErrorMessage = "E-mail já cadastrado";
            } else { 
                systemErrorMessage = 'Tente novamente mais tarde'
            }

            setError(systemErrorMessage);
            setLoading(false);
        }

    };

    //Signout user
    const logout = () => { 
        checkIfCancelled();
        try {
            signOut(auth);
        } catch (error) {
            console.log(error.message);            
        }
    }

    //Login
    const login = async (data) => { 
        checkIfCancelled();
        setError(null);
        setLoading(true);

       try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setLoading(false);
       } catch (error) {
            if(error.message.includes("wrong")) { 
                setError("Senha incorreta!");
            } else if(error.message.includes("found")) { 
                setError("Usuário invalido");
            } else { 
                setError("Tente novamente mais tarde!");
            }
       }
       setLoading(false);
        

    }
    

    useEffect(() => { 
        return () => setCancelled(true);
    }, [])

    return {auth, createUser, error, loading, logout, login}

}