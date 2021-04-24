const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		id: Int!
		name: String!
		owner: String!
		items: [Item]
	}
`;

module.exports = { typeDefs: typeDefs }