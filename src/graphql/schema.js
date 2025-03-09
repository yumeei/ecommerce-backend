import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    getAllUsers: [User!]!
    getUserById(userId: ID!): User!

    getAllProducts: [Product!]!
    getProductById(productId: ID!): Product!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): CreateUserResponse!

    signIn(
      email: String!
      password: String!
    ): SignInResponse!

    updateUser(
      id: ID!
      name: String
      email: String
      password: String
    ): UpdateUserResponse!

    deleteUser(id: ID!): DeleteUserResponse!

    createProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      category: String!
    ): CreateProductResponse!

    updateProduct(
      productId: ID!
      name: String
      description: String
      price: Float
      stock: Int
    ): UpdateProductResponse!

    deleteProduct(productId: ID!): DeleteProductResponse!
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type UpdateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type DeleteUserResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String!
  }

  type CreateProductResponse {
    code: Int!
    success: Boolean!
    message: String!
    product: Product
  }

  type UpdateProductResponse {
    code: Int!
    success: Boolean!
    message: String!
    product: Product
  }

  type DeleteProductResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    stock: Int
    createdAt: DateTime!
  }
`;
