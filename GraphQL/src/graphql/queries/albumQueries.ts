import { gql } from '@apollo/client';

export const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        id
        title
        photos {
          id
          title
          url
        }
      }
    }
  }
`;
