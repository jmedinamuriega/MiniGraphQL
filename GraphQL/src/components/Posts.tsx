import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_POSTS } from '../graphql/queries/queries';
import { DELETE_POST } from '../graphql/mutations/mutations'; 
import { Post } from '../interfaces/interfaces';
import DeletePost from './DeletePost';
import PostForm from './PostForm';
import './Posts.css';

interface PostsProps {
  userId: string;
  searchQuery: string;
}

const Posts: React.FC<PostsProps> = ({ userId, searchQuery }) => {
  const { loading, error, data, refetch } = useQuery<{ user: { posts: Post[] } }>(GET_USER_POSTS, {
    variables: { userId },
  });

  const [deletePost] = useMutation(DELETE_POST); 
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error">Error loading posts: {error.message}</p>;

  const filteredPosts = data?.user.posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostDelete = async (postId: string) => {
    try {
      await deletePost({ variables: { id: postId } }); 
      await refetch(); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostEdit = (post: Post) => {
    setSelectedPost(post);
  };

  const handleSuccess = () => {
    refetch(); 
    setSelectedPost(null); 
  };

  return (
    <div className="posts-container">
      <PostForm userId={userId} onSuccess={handleSuccess} post={selectedPost} />

      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="posts-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
              <small className="post-comments">Comments: {post.comments.length}</small>
              <div className="post-item-actions">
                <button className="edit-button" onClick={() => handlePostEdit(post)}>Edit</button>
                <button className="delete-button" onClick={() => handlePostDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-posts">No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
