const { gql } = require('apollo-server');

const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
		name: String!
		owner: String!
		subregions: [String]!
	}

	type Region {
		_id: String!
		id: Int!
		name: String!
		capital: String!
		leader: String!
		flag: String!
		landmarks: [Landmark]
		position: Int!
		parent: String!
		subregions: [String]!
		path: [String]!
	}

	type Landmark {
		_id: String!
		id: Int!
		name: String!
	}

	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
	}

	extend type Mutation {
		addRegion(region: RegionInput!, _id: String!, index: Int!): String
		addMap(map: MapInput!): String
		deleteRegion(region_Id: String!): [String]		
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String
		updateRegionField(region_Id: String!, field: String!, value: String!): [String]
	}

	input LandmarkInput {
		_id: String
		id: Int
		name: String
	}

	input RegionInput {
		_id: String
		id: Int
		name: String
		capital: String
		leader: String
		flag: String
		landmarks: [LandmarkInput]
		position: Int
		parent: String
		subregions: [String]
		path: [String]
	}

	input MapInput {
		_id: String
		id: Int
		name: String
		owner: String
		subregions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }