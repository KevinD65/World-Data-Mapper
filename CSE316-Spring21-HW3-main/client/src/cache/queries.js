import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query getDBMaps {
		getAllMaps {
			_id
			id
			name
			owner
			subregions
		}
	}
`;

export const GET_MAP_BY_ID = gql`
	query getMapByID ($_id: String!) {
		getMapById (_id: $_id) {
			_id
			id
			name
			owner
			subregions
		}
	}
`;
