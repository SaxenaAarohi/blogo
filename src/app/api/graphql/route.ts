import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import gql from "graphql-tag";
import getblogs, { createblog, deleteblog, updateblog } from "./resolvers/blog";
import { getdatabyid } from "./resolvers/blog";
import prismaclient from "@/services/prisma";
import { loginUser, signUpUser } from "./resolvers/user";

const typeDefs = gql`
  type Query {
     blog(id : String) : Blog,
    blogs (q:String): [Blog]
  }

  type Mutation {
    createblog(title : String , content : String , imageUrl : String) : Blog !,
    deleteblog(id : String): Boolean ,
    updateblog  (id : String!,title : String , content : String , imageUrl : String) : Boolean !,
    signUpUser(name :String!, email : String! , password :String !):Boolean !
 loginUser(email: String! , password :String!): Boolean!
  }

  type Blog {
  id : String,
  title : String,
  content : String,
  imageUrl : String,
  }
`;

const resolvers = {
    Query: {
        blog: getdatabyid,
        blogs: getblogs
    },
    Mutation: {
        createblog,
        deleteblog,
        updateblog,
        signUpUser,
        loginUser

    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});
export async function GET(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return handler(req, context);
}

