import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $title: String!, $body: String!) {
    createPost(userId: $userId, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
`;
