import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
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
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      body
      user {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      phone
      website
      address {
        street
        city
      }
      company {
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
