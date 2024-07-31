import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../graphql/mutations/mutations';
import { Post } from '../interfaces/interfaces';
import './PostForm.css';

interface PostFormProps {
  userId: string; 
  post?: Post | null;
  onSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ userId, post, onSuccess }) => {
  const [title, setTitle] = useState<string>(post?.title || '');
  const [body, setBody] = useState<string>(post?.body || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [post]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (post) {
        await updatePost({
          variables: {
            id: post.id,
            input: { title, body },
          },
        });
      } else {
        await createPost({
          variables: {
            userId,
            input: { title, body },
          },
        });
      }
      onSuccess();
    } catch (err) {
      setError('Error saving post');
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <h3>{post ? 'Edit Post' : 'Create a New Post'}</h3>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
