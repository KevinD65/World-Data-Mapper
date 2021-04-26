import React, { useState, useEffect } 	from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_MAPS } 				    from '../../cache/queries';

import DeleteMap 						from '../modals/DeleteMap';
import { WButton, WRow, WCol } from 'wt-frontend';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WLMain from 'wt-frontend/build/components/wlayout/WLMain';
import WLHeader from 'wt-frontend/build/components/wlayout/WLHeader';

import MapContents 				from '../MapData/MapContents';
//import all mutations and queries here

const MapSelect = (props) => {

    let maps = [];
    const [activeMap, setActiveMap] = useState({});
    const [showDeleteMap, toggleShowDeleteMap] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { maps = data.getAllMaps; }


    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllTodos;
			if (activeMap._id) {
				let tempID = activeMap._id;
				let map = maps.find(map => map._id === tempID);
				setActiveMap(map);
			}
		}
	}

    const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		refetchMaps(refetch);
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		refetchMaps(refetch);
		return retVal;
	}

    // Creates a default region and passes it to the backend resolver.
	// The return id is assigned to the region, and the region is appended
	//  to the local cache copy of the active map. 

	/*const addRegion = async () => { //needs parent path as argument
		let map = activeMap;
		const regions = map.subregions;
		const lastID = regions.length >= 1 ? regions[regions.length] : 0;
        const lastPosition = regions.length >= 1 ? regions[regions.length - 1].position + 1 : 0;
		const newRegion = {
			_id: '',
			id: lastID,
			name: 'N/A',
			capital: 'N/A',
			leader: 'N/A',
            flag: "",
            landmarks: [],
            position: lastPosition,
            parent: ,
            subregions: [],
            path: 
			completed: false
		};
		let opcode = 1;
		let itemID = newItem._id;
		let mapID = activeMap._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};*/
/*
    const deleteRegion = async (item, index) => { //when a region is deleted, all of its subregions must also be deleted AND the region must be deleted from its parent's subregions
		let listID = activeList._id;
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			id: item.id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};
*/
/*
    const editRegion = async (itemID, field, value, prev) => { //user can edit name, capital, or leader
		let flag = 0;
		if (field === 'completed') flag = 1;
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
*/
/*
    const createNewMap = async () => { //creates and adds a new map
		const length = todolists.length
		const id = length >= 1 ? todolists[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let list = {
			_id: '',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			items: [],
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
		await refetchTodos(refetch);
		if(data) {
			let _id = data.addTodolist;
			handleSetActive(_id);
		}
	};
*/
/*
    const deleteMap = async (_id) => { //deleting a map will delete all of its subregions from the database as well (perhaps everytime a new region is added, it's _id is appended to the root's array of subregions)
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
		refetch();
		setActiveList({});
	};
*/
/*
    const handleSetActive = (id) => {
		const todo = todolists.find(todo => todo.id === id || todo._id === id);
		setActiveList(todo);
	};
*/
/*
<WRow className = "mapSelect-button-header"> //for spreadsheet
				<i className="material-icons addRegion" /*onClick = {addRegion}>add</i>
				</WRow>
				<WCHeader className = "mapSelect-header">
					<WRow>
						<WCol size="2">
							<WButton className='spreadsheet-header-section' wType="texted" span="true">Name<i className="material-icons spreadsheetHeaderIcon">south</i></WButton> 
						</WCol>
	
						<WCol size="3">
							<WButton className='spreadsheet-header-section' wType="texted" span="true">Capital</WButton>
						</WCol>
	
						<WCol size="2">
							<WButton className='spreadsheet-header-section' wType="texted" span="true">Leader</WButton>
						</WCol>
						<WCol size="1">
							<WButton className='spreadsheet-header-section' wType="texted" span="true">Flag</WButton>
						</WCol>
						<WCol size="4">
							<WButton className='spreadsheet-header-section' wType="texted" span="true">Landmarks</WButton>
						</WCol>
					</WRow>
				</WCHeader>
				<WMMain>
	
				</WMMain> //className = "mapSelect-header" className = "mapSelect-body"

*/
    return(
		<>
			<div className = "mapSelect-spacing"></div>
			<WLayout wLayout = "header">
				<WLHeader>
					<WRow className = "mapSelect-redbar"></WRow>
					<div className = "mapSelect-blackbar">Your Maps</div>
				</WLHeader>
				<WLMain>
					<div className = "mapSelectionBox"> 
						<MapContents
							maps={maps} activeMap={activeMap}
						/>
					</div>
					<div className = "globeBox"> 
						<div className = "mapSelect-globe"></div>
						<WButton className = "createNewMap-button" span = "true" /*onClick = {createNewMap}*/>Create New Map</WButton>
					</div>
				</WLMain>
			</WLayout>
		</>
    );
};
export default MapSelect;