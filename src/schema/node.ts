import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      default: return null; // TODO implement
    }
  },
);

export { nodeInterface, nodeField };
