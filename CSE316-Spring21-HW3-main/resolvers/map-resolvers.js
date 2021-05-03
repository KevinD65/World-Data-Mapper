const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of map objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const maps = await Map.find({owner: _id});
			if(maps) return (maps);
		},
		/** 
		 	@param 	 {object} args - a map id
			@returns {object} a map on success and an empty object on failure
		**/
		getMapById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const map = await Map.findOne({_id: objectId});
			if(map) return map;
			else return ({});
		},
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of region objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id});
			if(regions) return (regions);
		},
		/** 
		 	@param 	 {object} args - a map id
			@returns {object} a map on success and an empty object on failure
		**/
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - a map id and an empty region object
			@returns {string} the objectID of the region or an error message
		**/
		addRegion: async(_, args) => {
			const { _id, region, index } = args;
			const mapId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Map.findOne({_id: mapId});
			if(!found) return ('Map not found'); //instead, check regions for the parent (greater depth than 1)

			if(region._id === '') region._id = objectId;
			let mapRegions = found.subregions;
		        if(index < 0) mapRegions.push(region._id);
			else mapRegions.splice(index, 0, region._id);
			await Map.updateOne({_id: mapId}, { subregions: mapRegions }); //appends the newRegionID to the parent's subregions array
			
			const newRegion = new Region({
				_id: region._id,
				id: region.id,
				name: 'N/A',
				capital: 'N/A',
				leader: 'N/A',
				flag: '',
				landmarks: region.landmarks,
				position: region.position,
				parent: region.parent,
				subregions: region.subregions,
				path: region.path,
				owner: region.owner,
			});
			const updated = await newRegion.save();
		
			if(updated) return (region._id);
			else return ('Could not add region');
		},
		/** 
		 	@param 	 {object} args - an empty map object
			@returns {string} the objectID of the map or an error message
		**/
		addMap: async (_, args) => {
			//console.log("MADE IT HERE");
			const { map } = args;
			const objectId = new ObjectId();
			const { id, name, owner, subregions } = map;
			const newMap = new Map({
				_id: objectId,
				id: id,
				name: name,
				owner: owner,
				subregions: subregions
			});
			const updated = await newMap.save();
			if(updated) return objectId;
			else return ('Could not add map');
		},
		/** 
		 	@param 	 {object} args - a map/region objectID and item objectID
			@returns {array} the updated regions array on success or the initial 
							 array on failure
		**/
		deleteRegion: async (_, args) => {
			const  { _id, itemId } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			listItems = listItems.filter(item => item._id.toString() !== itemId);
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);

		},
		/** 
		 	@param 	 {object} args - a map objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Map.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a map objectID, field, and the update value
			@returns {string} the new value on successful update, empty string on failure
		**/
		updateMapName: async (_, args) => {
			const { _id, value } = args;
			const objectId = new ObjectId(_id);
			const updated = await Map.updateOne({_id: objectId}, {name: value});
			if(updated) return value;
			else return "";
		},
		/** 
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateItemField: async (_, args) => {
			const { _id, itemId, field,  flag } = args;
			let { value } = args
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			if(flag === 1) {
				if(value === 'complete') { value = true; }
				if(value === 'incomplete') { value = false; }
			}
			listItems.map(item => {
				if(item._id.toString() === itemId) {	
					
					item[field] = value;
				}
			});
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);
		},
		/**
			@param 	 {object} args - contains list id, item to swap, and swap direction
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		reorderItems: async (_, args) => {
			const { _id, itemId, direction } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			const index = listItems.findIndex(item => item._id.toString() === itemId);
			// move selected item visually down the list
			if(direction === 1 && index < listItems.length - 1) {
				let next = listItems[index + 1];
				let current = listItems[index]
				listItems[index + 1] = current;
				listItems[index] = next;
			}
			// move selected item visually up the list
			else if(direction === -1 && index > 0) {
				let prev = listItems[index - 1];
				let current = listItems[index]
				listItems[index - 1] = current;
				listItems[index] = prev;
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		}

	}
}
