import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation CreateTodo($userId: ID!, $title: String!, $completed: Boolean!) {
    createTodo(userId: $userId, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;
