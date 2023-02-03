import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [comments, setComments] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    posts.forEach(post => {
      axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then(res => {
          setUserDetails(prevState => ({ ...prevState, [post.userId]: res.data }));
        })
        .catch(err => console.error(err));
    });
  }, [posts]);

  useEffect(() => {
    if (selectedPostId) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`)
        .then(res => {
          setComments(prevState => ({ ...prevState, [selectedPostId]: res.data }));
        })
        .catch(err => console.error(err));
    }
  }, [selectedPostId]);

  const handleCommentIconClick = postId => {
    setSelectedPostId(postId);
  };

  return (
    <div>
      {posts.map(post => (
        <div  key={post.id}>
          <h3><b>TITLE:- </b>{post.title}</h3>
          <p>{post.body}</p>
          <p>Author: {userDetails[post.userId]?.name}</p>
          <p>Email: {userDetails[post.userId]?.email}</p>
          <button onClick={() => handleCommentIconClick(post.id)}>
           View Top 2 Comments
          </button>
          {selectedPostId === post.id && (
            <div>
              <h4>Comments:</h4>
              {comments[selectedPostId]?.slice(0, 2).map(comment => (
                <div key={comment.id}>
                  <p>{comment.body}</p>
                  <p><b>Comment By:</b> {comment.name}</p>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
