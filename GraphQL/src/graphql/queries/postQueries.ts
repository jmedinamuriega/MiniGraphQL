import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $title: String!, $body: String!) {
    createPost(userId: $userId, title: $title, body: $body) {
      id
      title
      body
      comments {
        id
        name
        body
      }
    }
  }
`;
