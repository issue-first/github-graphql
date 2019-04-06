//create a mock apollo client

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { SchemaLink } from "apollo-link-schema"
import { makeExecutableSchema } from "graphql-tools"

import { InMemoryCache } from "apollo-cache-inmemory";

import { resolvers } from './resolver'

import schema from "./schema.public.js";

const cache = new InMemoryCache();

const executableSchema = makeExecutableSchema ({
    typeDefs: schema,
    resolvers, 
    resolverValidationOptions: {
        requireResolversForResolveType: false ,
    }
});

export default new ApolloClient({
    link: new SchemaLink({ schema: executableSchema}),
    cache
})
