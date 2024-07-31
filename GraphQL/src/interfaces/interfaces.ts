
export interface Comment {
  id: string;
  name: string;
  body: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  comments: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  posts: Post[];
  albums: Album[];
  todos: Todo[];
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Album {
  id: string;
  title: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  title: string;
  url: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
