import React from 'react';
import { useQuery } from '@apollo/client';
import { User } from '../interfaces/interfaces';
import { GET_USER } from '../graphql/queries/queries';
import './Profile.css';

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const { loading, error, data } = useQuery<{ user: User }>(GET_USER, {
    variables: { userId },
  });

  // Debugging information
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  if (loading) return <p className="profile-loading">Loading...</p>;
  if (error) return <p className="profile-error">Error: {error.message}</p>;

  // Ensure that `user` is defined
  const user = data?.user;

  if (!user) {
    return <p className="profile-no-data">User data not available</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">{user.name || 'User Name'}</h1>
      <div className="profile-info">
        <p><span>Email:</span> {user.email || 'No email provided'}</p>
        <p><span>Phone:</span> {user.phone || 'No phone number provided'}</p>
        <p><span>Website:</span> {user.website || 'No website provided'}</p>
        <p><span>Address:</span> {user.address ? `${user.address.street}, ${user.address.city}` : 'No address provided'}</p>
        <p><span>Company:</span> {user.company?.name || 'No company provided'}</p>
      </div>
    </div>
  );
};

export default Profile;
