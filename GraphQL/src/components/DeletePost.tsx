
import React from 'react';

interface DeletePostProps {
  postId: string;
  onDelete: (postId: string) => Promise<void>;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
};

export default DeletePost;
