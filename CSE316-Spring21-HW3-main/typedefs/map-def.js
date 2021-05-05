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
		flag: String
		landmarks: [Landmark]
		position: Int!
		parent: String!
		subregions: [String]!
		path: [String]!
		owner: String!
	}

	type Landmark {
		_id: String!
		id: Int!
		name: String!
	}

	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
		getAllRegions: [Region]
	}

	extend type Mutation {
		addRegion(region: RegionInput!, _id: String!, index: Int!): String
		addMap(map: MapInput!): String
		deleteMap(_id: String!): Boolean
		deleteRegion(parentId: String!, regionId: String!): String		
		updateMapName(_id: String!, value: String!): String
		editRegionField(regionId: String!, field: String!, value: String!): String
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
		owner: String
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