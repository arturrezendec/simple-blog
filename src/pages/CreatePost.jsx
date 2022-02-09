import React, { useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');

    const postCollectionRef = collection(db, 'posts');
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
        });
        navigate('/');
    };
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, []);

    return (
        <div className='cpPage'>
            <div className='cpContainer'>
                <h1>Create Post</h1>
                <div className='inputGroup'>
                    <label>Title:</label>
                    <input type='text' placeholder='Type your text here'
                        onChange={(event) => { setTitle(event.target.value); }} />
                </div>
                <div className='inputGroup'>
                    <label>Post:</label>
                    <textarea placeholder='Type your text here'
                        onChange={(event) => { setPostText(event.target.value); }} />
                </div>
                <button onClick={createPost}>Create Post</button>
            </div>
        </div>
    )
}

export default CreatePost;