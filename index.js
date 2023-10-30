import { config } from 'dotenv';
config();

import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import neo4j from "neo4j-driver";


const typeDefs = `#graphql
type Movie {
    title: String
    length: Int
}
type Query {
    businesses: [Business]
     users: [User]
}
`;

const driver = neo4j.driver(
    process.env.NEO4J_URI, 
    neo4j.auth.basic("neo4j", process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver})

console.log(neoSchema.schema);


const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => {
        return { driver, req };
    }
})


server.listen().then(({url}) => {
    console.log(`GraphQL server ready at ${url}`)
})


// because I wrote the resolver in this case when I run in debug mode in the terminal 
// it doesn't log out the cypher query

// type Business {
//     name: String
//     address: String
//     businessID: String
//     inCategoryCategory: Category @relationship(type: "IN_CATEGORY", direction: OUT)
//     reviewReviews: Review @relationship(type: "REVIEWS", direction: IN)
//   }
  
//   type Category {
//     name: String
//     businessInCategory: Business @relationship(type: "IN_CATEGORY", direction: IN)
//   }
  
//   type Review {
//     reviewID: String
//     created: Date
//     text: String
//     stars: Float
//     reviewsBusiness: Business @relationship(type: "REVIEWS", direction: OUT)
//     writtenByUser: User @relationship(type: "WRITTEN_BY", direction: OUT)
//   }
  
//   type User {
//     screen_name: String
//     reviewWrittenBy: Review @relationship(type: "WRITTEN_BY", direction: IN)
//   } 

////
// require('dotenv').config(); 

// // pull in the Neo4j graphQl library
// const {Neo4jGraphQL} = require("@neo4j/graphql");
// // pull in apollo server and gql template tag
// // template tage - allows us to parse graphQL strings in our code
// const {ApolloServer, gql}= require("apollo-server");
// // gets the neo4j javascript driver
// const neo4j = require("neo4j-driver");


// // graphQL type definitions
// // type defintions tell us everything about the data in our graphQL api
// const typeDefs = gql`
// type Business {
//     name: String
//     address: String
//     businessID: String
//     inCategoryCategory: Category @relationship(type: "IN_CATEGORY", direction: OUT)
//     reviewReviews: Review @relationship(type: "REVIEWS", direction: IN)
//   }
  
//   type Category {
//     name: String
//     businessInCategory: Business @relationship(type: "IN_CATEGORY", direction: IN)
//   }
  
//   type Review {
//     reviewID: String
//     created: String
//     text: String
//     stars: Float
//     reviewsBusiness: Business @relationship(type: "REVIEWS", direction: OUT)
//     writtenByUser: User @relationship(type: "WRITTEN_BY", direction: OUT)
//   }
  
//   type User {
//     screen_name: String
//     reviewWrittenBy: Review @relationship(type: "WRITTEN_BY", direction: IN)
//   }
// `;
// // const resolvers = {
// //     Query: {
// //         movies: () => [{ title: "Test Movie" }]
// //     }
// // };



// // create a drive instance
// const driver = neo4j.driver(
//     process.env.NEO4J_URI, // this will be the connection string to our neo4j aura instance
//     neo4j.auth.basic("neo4j", process.env.NEO4J_PASSWORD) //the database username will be neo4j
// );

// //create our schema
// const neoSchema = new Neo4jGraphQL({typeDefs, driver}) // pass it the type defintions and the driver(so it knows how to connect to our database)

// console.log(neoSchema.schema);

// //create a new apollo server instance
// const server = new ApolloServer({
//     schema: neoSchema.schema,
//     context: ({ req }) => {
//         return { driver, req };
//     }
// })
// // const server = new ApolloServer({
// //     typeDefs,
// //     resolvers
// // });

// server.listen().then(({url}) => {
//     console.log(`GraphQL server ready at ${url}`)
// })


// // because I wrote the resolver in this case when I run in debug mode in the terminal 
// // it doesn't log out the cypher query