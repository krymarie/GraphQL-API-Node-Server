import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { createContext } from './context';

new ApolloServer({ schema, context: createContext }).listen( { port: 4000 },
	() =>
		console.log(`Server available at: http://localhost:4000`,
	),
)
