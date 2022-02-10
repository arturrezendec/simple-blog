import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config'
import { auth } from '../firebase-config'


function Home({isAuth}) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, 'posts');

    const deletePost = async (id) => {
        const postDoc = doc(db, 'posts', id);
        await deleteDoc(postDoc)
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            console.log(data);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPosts();
    },[deletePost]);
        
    

    return (
        <div className='homePage'>
            {postLists.map((post) => {
                return (
                <div className='post'>
                    <div className='postHeader'>
                        <div className='postTitle'>
                            <h1>{post.title}</h1>
                            {isAuth && post.author.id === auth.currentUser.uid && 
                            ( <button className='delete-post-btn' 
                            onClick={() => deletePost(post.id)}>Delete</button>
                            )}
                        </div>
                        <div className='postText'>
                            <p>{post.postText}</p>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default Home;