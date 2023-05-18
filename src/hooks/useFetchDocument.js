import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useFetchDocument = (docCollection, idPost) => { 
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const loadDocument = async () => { 
            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, idPost);
                const docSnap = await getDoc(docRef);
    
                setDocument(docSnap.data());
            } catch (error) {
                console.log(error);
                setError(error.message);                
            }
            
            setLoading(false);
        }
        loadDocument();
    }, [docCollection, idPost]);

    return {document, loading, error};
}