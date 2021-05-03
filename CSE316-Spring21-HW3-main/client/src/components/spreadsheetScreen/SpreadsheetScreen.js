import React, { useState, useEffect } 	from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				    from '../../cache/queries';
//import { GET_MAP_BY_ID } 				    from '../../cache/queries';
//import { ADD_MAP }						from '../../cache/mutations';

import { WButton, WRow, WCol } from 'wt-frontend';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WLMain from 'wt-frontend/build/components/wlayout/WLMain';
import WLHeader from 'wt-frontend/build/components/wlayout/WLHeader';
import MapContents 				from '../MapData/MapContents';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import SpreadsheetHeader from '../MapData/SpreadsheetHeader';
import SpreadsheetContents from '../MapData/SpreadsheetContents';

const SpreadsheetScreen = (props) => {

	//console.log(props.user.name + "me");

    // const [activeMap, setActiveMap] = useState({});
    // const [showDeleteMap, toggleShowDeleteMap] = useState(false);
	// const [spreadsheetScreenOn, toggleSpreadsheetScreen] = useState(false);

	// const { regionName } = useParams();

	//import all mutations and queries here
	//const [AddMap] = useMutation(mutations.ADD_MAP);
	//const [DeleteMap] = useMutation(mutations.DELETE_MAP);
	//const {GetMap} = useQuery(GET_MAP_BY_ID);

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
			<BrowserRouter>
				<Switch>
                    <Route path = "/regionSpreadsheet">
                        <SpreadsheetHeader
							activeMap={props.activeMap} activeRegion={props.activeRegion}
							region={props.regions} addRegion={props.addRegion}
							undo={props.undo} redo={props.redo}
							refetch2={props.refetch2}
						/>
                        <SpreadsheetContents
							activeMap={props.activeMap} activeRegion={props.activeRegion}
							regions={props.regions} setShowRegionViewerScreen={props.setShowRegionViewerScreen}
							setShowSpreadsheetScreen={props.setShowSpreadsheetScreen}
							toggleRegionViewerScreen={props.toggleRegionViewerScreen}
							setViewedRegion={props.setViewedRegion}
						/>    
                    </Route>
				</Switch>
			</BrowserRouter>
    );
};
export default SpreadsheetScreen;