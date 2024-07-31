
import { gql } from '@apollo/client';

export const CREATE_POST = gql`
mutation CreatePost($userId: ID!, $input: PostInput!) {
  createPost(userId: $userId, input: $input) {
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

export const UPDATE_POST = gql`
mutation UpdatePost($id: ID!, $input: PostInput!) {
  updatePost(id: $id, input: $input) {
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


export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
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
