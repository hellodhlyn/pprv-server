import { GraphQLSchema } from 'graphql';
import Koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import { queryType } from './schema/query';

const schema = new GraphQLSchema({
  query: queryType,
});

const app = new Koa();
app.use(mount('/graphql', graphqlHTTP({ schema, graphiql: true })));

export default app;
