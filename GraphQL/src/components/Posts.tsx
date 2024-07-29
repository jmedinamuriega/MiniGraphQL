import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../graphql/queries/queries';
import { Post } from '../interfaces/interfaces';
import DeletePost from './DeletePost';
import './Posts.css';

interface PostsProps {
  userId: string;
  searchQuery: string;
}

const Posts: React.FC<PostsProps> = ({ userId, searchQuery }) => {
  const { loading, error, data, refetch } = useQuery<{ user: { posts: Post[] } }>(GET_USER_POSTS, {
    variables: { userId },
  });

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error">Error loading posts: {error.message}</p>;

  const filteredPosts = data?.user.posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostDelete = async (postId: string) => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refetching posts:', error);
    }
  };

  return (
    <div className="posts-container">
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Comments: {post.comments?.length || 0}</small>
            <div className="post-item-actions">
              <DeletePost postId={post.id} onDelete={handlePostDelete} />
            </div>
          </div>
        ))
      ) : (
        <p className="no-posts">No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
