const { model, Schema, ObjectId } = require('mongoose');
const Item = require('./item-model').schema;

const mapSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		items: [Item],
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;