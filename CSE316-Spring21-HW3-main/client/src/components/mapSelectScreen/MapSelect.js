import React, { useState, useEffect } 	from 'react';
import globe							from '../../Images/Globe.PNG';
//import { useMutation, useQuery } 		from '@apollo/client';
//import * as mutations 					from '../../cache/mutations';
//import { GET_DB_MAPS } 				    from '../../cache/queries';
//import { GET_MAP_BY_ID } 				    from '../../cache/queries';
//import { ADD_MAP }						from '../../cache/mutations';

//import DeleteMap 						from '../modals/DeleteMapModal';
import { WButton, WRow, WCol } from 'wt-frontend';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WLMain from 'wt-frontend/build/components/wlayout/WLMain';
import WLHeader from 'wt-frontend/build/components/wlayout/WLHeader';
import MapContents 				from '../MapData/MapContents';
import SpreadsheetScreen 		from '../spreadsheetScreen/SpreadsheetScreen';
import { BrowserRouter, Switch, Route, Redirect, useParams, useHistory } from 'react-router-dom';

const MapSelect = (props) => {

	// console.log(props.user.name + "me");
    // let maps = [];
    // const [activeMap, setActiveMap] = useState({});
    //const [showDeleteMap, toggleShowDeleteMap] = useState(false);
	//const [spreadsheetScreenOn, toggleSpreadsheetScreen] = useState(false);

	const { mapName } = useParams();

	//import all mutations and queries here
	// const [AddMap] = useMutation(mutations.ADD_MAP);
	// const [DeleteMap] = useMutation(mutations.DELETE_MAP);
	//const {GetMap} = useQuery(GET_MAP_BY_ID);
/*
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { maps = data.getAllMaps; }

    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps;
			if (activeMap._id) {
				let tempID = activeMap._id; 
				let map = maps.find(map => map._id === tempID);
				setActiveMap(map);
			}
		}
	}
*/
/*
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
*/
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
		const length = maps.length
		const id = length >= 1 ? maps[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		let map = {
			_id: '',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			subregions: [],
		}
		const { data } = await AddMap({ variables: { map: map }, refetchQueries: [{ query: GET_DB_MAPS }] });
		//console.log("HAIRCUT");
		await refetchMaps(refetch);
		console.log(maps);
		/*
		if(data) {
			let _id = data.addMap;
			handleSetActive(_id);
		}*/
/*
	const handleMapDeletion = (_id) => {
		handleSetActive(_id);
		toggleShowDeleteMap(!showDeleteMap);
		console.log(showDeleteMap);
		//setShowDeleteMap();
	}

	const setShowDeleteMap = () => {
		console.log("before" + showDeleteMap);
		toggleShowDeleteMap(!showDeleteMap);
		console.log("KEVIND" + showDeleteMap);
	}
*/
/*
    const deleteMap = async (_id) => { //deleting a map will delete all of its subregions from the database as well (perhaps everytime a new region is added, it's _id is appended to the root's array of subregions)
		/*console.log("what is my id? " + _id);
		//DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_MAPS }] });
		await refetchMaps(refetch);
		console.log("DELETE WORKED");
		//refetch();*/
	
/*
    const handleSetActive = (id) => {
		const map = maps.find(map => map.id === id || map._id === id);
		setActiveMap(map);
	};


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
		

				<BrowserRouter>
				<Switch>
					<Route 
						path = "/mapSelect/spreadsheet"
						name = "/mapSelect/spreadsheet"> 
						{console.log("WHAT THE HELL IS GOING ON?" + spreadsheetScreenOn)}
						{spreadsheetScreenOn ?
							<div>
								<SpreadsheetScreen/>
							</div>
						: <Redirect from = "/mapSelect/spreadsheet" to="/mapSelect"/> }
					</Route>
					<Route path ="/mapSelect">
						{console.log("redirected here")}
						{!spreadsheetScreenOn ? 
						<>
							<div className = "mapSelect-spacing"></div>
							<WLayout wLayout = "header">
								<WLHeader>
									<WRow className = "mapSelect-redbar"></WRow>
									<div className = "mapSelect-blackbar">Your Maps</div>
								</WLHeader>
								<WLMain>
									<>
									<div className = "mapSelectionBox"> 
										<MapContents
											maps={maps} activeMap={activeMap}
											toggleSpreadsheetScreen={activateSpreadSheetScreen}
											handleMapDeletion={handleMapDeletion}
										/>
									</div>
									<div className = "globeBox"> 
										<div className = "mapSelect-globe"></div>
										<WButton className = "createNewMap-button" span = "true" onClick = {createNewMap}>Create New Map</WButton>
									</div>
									{
										  showDeleteMap && (<DeleteMap deleteMap={deleteMap} setShowDeleteMap={setShowDeleteMap} activeMap_id={activeMap._id}/>)
									}
									</>
								</WLMain>
							</WLayout>
						</>
						: <Redirect from = "/mapSelect" to = "/mapSelect/spreadsheet"/>}
					</Route>
				</Switch>
			</BrowserRouter>

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
					<>
					<div className = "mapSelectionBox"> 
						<MapContents
							maps={props.maps} regions={props.regions}
							activeMap={props.activeMap}
							toggleSpreadsheetScreen={props.toggleSpreadsheetScreen}
							handleMapDeletion={props.handleMapDeletion}
							setShowSpreadsheetScreen={props.setShowSpreadsheetScreen}
							editMapName={props.editMapName}
						/>
					</div>
					<div className = "globeBox"> 
						<div className = "mapSelectGlobe"><img src = {globe} className="mapSelectGlobeImage"/></div>
						<WButton className = "createNewMap-button" span = "true" onClick = {props.createNewMap}>Create New Map</WButton>
					</div>
					</>
				</WLMain>
			</WLayout>
		</>
    );
};
export default MapSelect;