import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_ALBUMS } from '../graphql/queries/albumQueries';
import { Album } from '../interfaces/interfaces';
import './Album.css';

const Albums: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery<{ user: { albums: Album[] } }>(GET_USER_ALBUMS, {
    variables: { userId },
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="albums-container">
      {data?.user.albums.map((album) => (
        <div key={album.id} className="album-item">
          <h3>{album.title}</h3>
          <div>
            {album.photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <h4>{photo.title}</h4>
                <img src={photo.url} alt={photo.title} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
