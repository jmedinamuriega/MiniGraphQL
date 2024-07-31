import { ApolloServer, gql } from 'apollo-server';


const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
    posts: [Post!]!
    albums: [Album!]!
    todos: [Todo!]!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    name: String!
    body: String!
  }

  type Album {
    id: ID!
    title: String!
    photos: [Photo!]!
  }

  type Photo {
    id: ID!
    title: String!
    url: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  input PostInput {
    title: String!
    body: String!
  }

  input TodoInput {
    title: String!
    completed: Boolean!
  }

  type Query {
    user(id: ID!): User
    posts: [Post!]!
    albums(userId: ID!): [Album!]!
    todos(userId: ID!): [Todo!]!
  }

  type Mutation {
    createPost(userId: ID!, input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post
    
    createTodo(userId: ID!, input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

// Mock data
const mockPosts = [
  { id: '1', title: 'Post 1', body: 'Content 1', comments: [{ id: '1', name: 'Commenter 1', body: 'Nice post!' }] },
  { id: '2', title: 'Post 2', body: 'Content 2', comments: [{ id: '2', name: 'Commenter 2', body: 'Interesting!' }] },
];

const mockAlbums = [
  { id: '1', title: 'Album 1', photos: [{ id: '1', title: 'Photo 1', url: 'http://example.com/photo1.jpg' }] },
  { id: '2', title: 'Album 2', photos: [{ id: '2', title: 'Photo 2', url: 'http://example.com/photo2.jpg' }] },
];

const mockTodos = [
  { id: '1', title: 'Todo 1', completed: false },
  { id: '2', title: 'Todo 2', completed: true },
];

// Define resolvers
const resolvers = {
  Query: {
    user: (parent, args) => {
      return {
        id: args.id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 4B',
          city: 'Anytown',
          zipcode: '12345',
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Example Corp',
          catchPhrase: 'We do things!',
          bs: 'business solutions',
        },
        posts: mockPosts,
        albums: mockAlbums,
        todos: mockTodos,
      };
    },
    posts: () => mockPosts,
    albums: (parent, args) => mockAlbums,
    todos: (parent, args) => mockTodos,
  },
  Mutation: {
    createPost: (parent, args) => {
      const newPost = {
        id: String(mockPosts.length + 1),
        title: args.input.title,
        body: args.input.body,
        comments: [],
      };
      mockPosts.push(newPost);
      return newPost;
    },
    
    updatePost: (parent, args) => {
      const postIndex = mockPosts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) throw new Error('Post not found');
      mockPosts[postIndex] = { ...mockPosts[postIndex], title: args.input.title, body: args.input.body };
      return mockPosts[postIndex];
    },
    
    deletePost: (parent, args) => {
      const postIndex = mockPosts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) throw new Error('Post not found');
      const deletedPost = mockPosts.splice(postIndex, 1);
      return deletedPost[0];
    },
    

    createTodo: (parent, args) => {
      const newTodo = {
        id: String(mockTodos.length + 1),
        title: args.input.title,
        completed: args.input.completed,
      };
      mockTodos.push(newTodo);
      return newTodo;
    },
    updateTodo: (parent, args) => {
      const todoIndex = mockTodos.findIndex((todo) => todo.id === args.id);
      if (todoIndex === -1) throw new Error('Todo not found');
      mockTodos[todoIndex] = { ...mockTodos[todoIndex], title: args.input.title, completed: args.input.completed };
      return mockTodos[todoIndex];
    },
    deleteTodo: (parent, args) => {
      const todoIndex = mockTodos.findIndex((todo) => todo.id === args.id);
      if (todoIndex === -1) throw new Error('Todo not found');
      const deletedTodo = mockTodos.splice(todoIndex, 1);
      return deletedTodo[0];
    },
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
