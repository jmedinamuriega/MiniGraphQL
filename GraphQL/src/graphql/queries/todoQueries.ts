
import { gql } from '@apollo/client';

export const GET_USER_TODOS = gql`
  query GetUserTodos($userId: ID!) {
    user(id: $userId) {
      todos {
        id
        title
        completed
      }
    }
  }
`;

