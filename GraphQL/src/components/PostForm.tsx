import React, { useState, useEffect } from 'react';
import './PostForm.css';

interface PostFormProps {
  onSuccess: () => void;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState<string>(localStorage.getItem('title') || '');
  const [body, setBody] = useState<string>(localStorage.getItem('body') || '');
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('title', title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem('body', body);
  }, [body]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newPost: Post = {
        id: Date.now(), 
        title,
        body,
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setTitle('');
      setBody('');
      localStorage.removeItem('title');
      localStorage.removeItem('body');
      onSuccess();
    } catch (err) {
      setError('Error creating post');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Create a New Post</h3>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      <div>
        <h3>Posts</h3>
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostForm;
