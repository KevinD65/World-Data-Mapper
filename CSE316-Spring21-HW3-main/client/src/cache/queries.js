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
			items {
				_id
				id
				description
				due_date
				assigned_to
				completed
			}
		}
	}
`;
