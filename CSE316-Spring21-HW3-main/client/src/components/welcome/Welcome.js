import React, { useState, useEffect } 						from 'react';
import globe 												from '../../Images/Globe.PNG';
//import components/modals
import Logo 												from '../navbar/Logo';
import NavbarOptions 										from '../navbar/NavbarOptions';
import MapSelect 											from '../mapSelectScreen/MapSelect';
import SpreadsheetScreen                                    from '../spreadsheetScreen/SpreadsheetScreen';
import RegionViewerScreen									from '../regionViewerScreen/RegionViewerScreen';

import Login 												from '../modals/Login';
import CreateAccount 										from '../modals/CreateAccount';
import UpdateAccount 										from '../modals/UpdateAccount';
import DeleteMapModal										from '../modals/DeleteMapModal';

//import queries/mutations
import * as queries 				    					from '../../cache/queries';
import * as mutations 										from '../../cache/mutations';
import { useMutation, useQuery, useApolloClient } 			from '@apollo/client';

//import WolfieTools stuff
import { WNavbar, WSidebar, WNavItem } 						from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } 				from 'wt-frontend';

import { UpdateListField_Transaction, 
	UpdateSpreadsheetItems_Transaction, 
	ReorderItems_Transaction, 
	SortByColumn_Transaction,
	EditRegion_Transaction } 				from '../../utils/jsTPS';
//import WInput from 'wt-frontend/build/components/winput/WInput';
import { BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';

const Welcome = (props) => {
	//define all screen/modal hooks
	const [showDeleteMap, toggleShowDeleteMap] 				= useState(false);
	const [showLogin, toggleShowLogin] 						= useState(false);
	const [showCreate, toggleShowCreate] 					= useState(false);
	const [showUpdate, toggleShowUpdate]					= useState(false);
	const [spreadsheetScreenOn, toggleSpreadsheetScreen]	= useState(false);
	const [mapSelectScreen, toggleMapSelectScreen] 			= useState(false);
	const [regionViewerScreen, toggleRegionViewerScreen] 	= useState(false);
	const [home, toggleHome]								= useState(false);

	//define mutations/queries needed
	//const [GetUser]											= useQuery(queries.GET_DB_USER);
	const [AddMap] 											= useMutation(mutations.ADD_MAP);
	const [DeleteMap] 										= useMutation(mutations.DELETE_MAP);
	const [UpdateMapName]									= useMutation(mutations.UPDATE_MAP_NAME);
	const [AddRegion]										= useMutation(mutations.ADD_REGION);
	const [EditRegion]										= useMutation(mutations.EDIT_REGION_FIELD);
	const [DeleteRegion]									= useMutation(mutations.DELETE_REGION);
	const [sortingFunction]									= useMutation(mutations.SORT_BY_COLUMN);
	const [revertingFunction]								= useMutation(mutations.REVERT_SORT);
	const [Logout] 											= useMutation(mutations.LOGOUT);

	let maps = []; //holds all the maps
	let regions = []; //holds all the regions
	let regionsOfParent = [];

	const client = useApolloClient();
    const [activeMap, setActiveMap] = useState(null); //an array holding a singular map object (or none). The map whose spreadsheet screen is being showed
	const [activeRegion, setActiveRegion] = useState(null); //an array holding a singular region object (or none). The region whose spreadsheet screen is being showed
	const [viewedRegion, setViewedRegion] = useState(null); //the map/region whose region viewed screen is being showed (should be an _id);

	
	useEffect(() => {
		//console.log(activeMap);
		//console.log("useEffect");
		//refetchRegions(refetch2);
	}/*, [activeMap]*/);

	const { loading, error, data, refetch } = useQuery(queries.GET_DB_MAPS);
	const regionQuery = useQuery(queries.GET_DB_REGIONS);
	//const regionQuery = useQuery(queries.GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	//if(data) { maps = data.getAllMaps; }
	if(data) {data.getAllMaps.map(map => maps.push(map));}

	if(regionQuery.loading) { console.log(loading, 'loading'); }
	if(regionQuery.error) { console.log(error, 'error'); }
	//if(regionQuery.data) { regions = regionQuery.data.getAllRegions; }
	if(regionQuery.data) { //used to fill regionsOfParent array with all regions that are subregions of the activeMap/activeRegion
		let active = null;
		if(activeRegion === null)
			active = activeMap;
		else if(activeRegion !== null)
			active = activeRegion;
		if(active !== null){
			regionQuery.data.getAllRegions.map(region => regions.push(region));
			regionsOfParent = [];
			for(let i = 0; i < regions.length; i++){ //simply makes the array of regions associated with this parent
				if(regions[i].parent === active._id){
					regionsOfParent.push(regions[i]);
				}
			}

			let temp;
			for(let a = 0; a < regionsOfParent.length; a++){ //bubble sort to actually sort the array of regions associated with this parent
				for(let b = 0; b < regionsOfParent.length - a - 1; b++){
					if(regionsOfParent[b].position > regionsOfParent[b+1].position){
						temp = regionsOfParent[b];
						regionsOfParent[b] = regionsOfParent[b+1];
						regionsOfParent[b+1] = temp;
					}
				}
			}

		}
	}
	const refetch2 = regionQuery.refetch;

	const userName = props.userName;

    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps;
			if (activeMap !== null) {
				let tempID = activeMap._id; 
				let myMap = maps.find(map => map._id === tempID);
				setActiveMap(myMap);
			}
		}
	}

	const refetchRegions = async (refetch) => {
		const regionRefetch = await refetch();
		if(regionRefetch) {
			regions = regionRefetch.data.getAllRegions;
			console.log(regionRefetch.data);
		}
	}

	const auth = props.user === null ? false : true; //used to check if a user is logged in

	/*
    const handleLogout = async () => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) toggleMapSelectScreen(false);
        }
    };
	*/
	const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		refetchMaps(refetch);
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		//console.log("WHERE ARE WE?");
		await refetchMaps(refetch);
		await refetchRegions(refetch2);
		//console.log("WE ARE REFETCHING HERE");
		return retVal;
	}

	const tpsHasUndo = async () => {
		const hasUndo = await props.tps.hasTransactionToUndo();
		return hasUndo;
	}

	const tpsHasRedo = async () => {
		const hasRedo = await props.tps.hasTransactionToRedo();
		return hasRedo;
	}

	const resetTPSStack = async () => { //gets called whenever screen is switched away from spreadsheet view/regionViewer
		await props.tps.clearAllTransactions();
	}

	const handleMapDeletion = (_id) => {
		handleSetActive(_id);
		toggleShowDeleteMap(!showDeleteMap);
	}

	const setShowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
	}

	const handleSetActive = (id) => {
		const map = maps.find(map => map.id === id || map._id === id);
		console.log(map);
		setActiveMap(map);
		console.log(activeMap);
	};

	const handleSetActiveRegion = (id) => {
		const region = regions.find(region => region.id === id || region._id === id);
		setActiveRegion(region);
		console.log(activeRegion);
	};

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
		const { data } = await AddMap({ variables: { map: map }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
		await refetchMaps(refetch);
	};

	const editMapName = async (mapID, name) => {
		console.log("what is my id: " + (mapID));
		console.log(name);
		await UpdateMapName({ variables: { _id: mapID, value: name }, refetchQueries: [{ query: queries.GET_DB_MAPS }]});
		await refetchMaps(refetch);
	}

	const deleteMap = async (_id) => { 
		//deleting a map will delete all of its subregions from the database as well (perhaps everytime a new region is added, it's _id is appended to the root's array of subregions)
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
		await refetchMaps(refetch);
	};

	const addRegion = async (parentID) => {
		let map;
		let updatedPath = [];
		if(activeRegion == null || activeRegion === undefined){
			map = activeMap;
			updatedPath.push(map._id);
		}
		else{
			map = activeRegion;
			updatedPath = map.path;
			updatedPath = updatedPath.concat(map._id);
			//console.log(updatedPath);
		}
		//console.log(map);
		const regions = map.subregions; //regions holds an array of IDs
		const lastID = regions.length >= 1 ? regions.length : 0;
        const lastPosition = regions.length >= 1 ? regions.length: 0;
		//console.log(regions);
		//console.log(parentID);

		const newRegion = {
			_id: '',
			id: lastID,
			name: 'N/A',
			capital: 'N/A',
			leader: 'N/A',
            flag: '',
            landmarks: [],
            position: lastPosition,
            parent: parentID,
            subregions: [],
            path: updatedPath,
			owner: props.user._id,
		};
		let opcode = 1;
		let regionID = newRegion._id;
		let transaction = new UpdateSpreadsheetItems_Transaction(parentID, regionID, newRegion, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		//console.log("IS THIS BEFORE RENDER?");
		await tpsRedo();
		await refetchMaps(refetch);
		await refetchRegions(refetch2);
	};

	
    const editRegion = async (regionId, field, value, prev) => { //user can edit name, capital, or leader
		let transaction = new EditRegion_Transaction(regionId, field, prev, value, EditRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteRegion = async (region) => {
		let opcode = 0; //opcode for deletion
		let regionToDelete = {
			_id: region._id,
			id: region.id,
			name: region.name,
			capital: region.capital,
			leader: region.leader,
            flag: region.flag,
            landmarks: region.landmarks,
            position: region.position,
            parent: region.parent,
            subregions: region.subregions,
            path: region.path,
			owner: region.owner,
		}
		let transaction = new UpdateSpreadsheetItems_Transaction(region.parent, region._id, regionToDelete, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		await tpsRedo();
		await refetchMaps(refetch);
		await refetchRegions(refetch2);
	}

	const sortByColumn = async (parent, sortCode) => {
		let prevSubregionsArr = parent.subregions;
		//console.log(parent._id);
		let transaction = new SortByColumn_Transaction(parent._id, prevSubregionsArr, sortingFunction, revertingFunction, sortCode);
		props.tps.addTransaction(transaction);
		await tpsRedo();
	}

	/*
		Used for toggling modals
	*/
	const setShowLogin = () => {
		toggleShowUpdate(false);
		toggleShowDeleteMap(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowUpdate(false);
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	}

	const setShowDelete = () => {
		toggleShowUpdate(false);
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDeleteMap(!showDeleteMap)
	}

	/*
		Used for toggling between screens
	*/
	const setShowSpreadsheetScreen = async (parentID, setCode, resetActiveRegion) => {
		//console.log("parent" + parentID);
		toggleMapSelectScreen(false);
		toggleRegionViewerScreen(false);
		toggleSpreadsheetScreen(true);
		
		console.log(mapSelectScreen);
		console.log(regionViewerScreen);
		console.log(spreadsheetScreenOn);

		if(resetActiveRegion){ //decides whether to reset the active region (Ex: returning from a subregion's spreadsheet to the map data file's spreadsheet)
			//setViewedRegion(null);
			setActiveRegion(null);
			//console.log("this happened");
		}
			
		if(!setCode){ //conditional used to set up activeRegion/activeMap so spreadsheets open properly
			handleSetActive(parentID);
		}
		else{
			handleSetActiveRegion(parentID);
			//console.log(activeRegion);
		}

		setViewedRegion(parentID);
		//console.log(viewedRegion);
	}

	const setShowRegionViewerScreen = async (_id) => {
		toggleMapSelectScreen(false);
		toggleSpreadsheetScreen(false);
		toggleRegionViewerScreen(true);

		console.log(mapSelectScreen)
		console.log(spreadsheetScreenOn);
		console.log(regionViewerScreen);
	}

	const backToSpreadSheet = async () => {
		toggleRegionViewerScreen(false);
		toggleMapSelectScreen(false);
		toggleSpreadsheetScreen(true);
	}


	//let history = useHistory();

	const goHome = () =>{
		toggleSpreadsheetScreen(false);
		toggleRegionViewerScreen(false);
		toggleMapSelectScreen(true);
		setViewedRegion(null); //reset the viewedRegion
		setActiveRegion(null); //reset the activeRegion
	}

	return (
		<>
		<BrowserRouter>
			<Switch>
				<Route exact path="/"> 
					<Redirect exact from="/" to="/welcome"/>
				</Route>

				<Route path = "/welcome"> 
					{/* {auth ?  */}
					
						<>{/* {if(auth !== null) console.log("hi");} SIMULATE A LOGOUT} */}</>
					<WLayout wLayout="header">
						<WLHeader>
							<WNavbar color="colored">
								<ul>
									<WNavItem>
										<Logo className='logo' />
									</WNavItem>
								</ul>
								<ul>
									<NavbarOptions
										fetchUser={props.fetchUser} auth={auth} 
										setShowCreate={setShowCreate} setShowLogin={setShowLogin}
										setShowUpdate={setShowUpdate} userName={userName}/*Need a prop for the user's name*/
										toggleMapSelectScreen={toggleMapSelectScreen} spreadsheetScreenOn={props.spreadsheetScreenOn}
									/>
								</ul>
							</WNavbar>
						</WLHeader>

						<WLMain>
							{!auth ? 
								<>
									<Redirect exact from="/mapSelect" to={ {pathname: "/welcome"} } />
									<div className="container-secondary">
										<img src={globe}/>
									</div>
									<div className = "welcome-title">
										Welcome To The
									</div>
									<div className = "welcome-title bottom-text">
										World Data Mapper
									</div>
									{
										showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
									}

									{
										showLogin && (<Login fetchUser={props.fetchUser} /*refetchTodos={refetch}*/ setShowLogin={setShowLogin} toggleMapSelectScreen={toggleMapSelectScreen}/>)
									}
									{
										showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate}/>)
									}
								</>
								:<Redirect exact from="/welcome" to="/mapSelect"/>
							}
						</WLMain>
					</WLayout>
					{/* } */}
				</Route>

				<Route 
					path = "/mapSelect" 
					name = "/mapSelect">
					<>
					{auth ?
						!spreadsheetScreenOn && !regionViewerScreen ?
							<WLayout wLayout="header">
								<WLHeader>
									<WNavbar color="colored">
										<ul>
											<WNavItem onClick={goHome}>
												<Logo className='logo' />
											</WNavItem>
										</ul>
										<ul>
											<NavbarOptions
												fetchUser={props.fetchUser} auth={auth} 
												setShowCreate={setShowCreate} setShowLogin={setShowLogin}
												setShowUpdate={setShowUpdate} userName={userName}
												toggleMapSelectScreen={toggleMapSelectScreen} spreadsheetScreenOn={props.spreadsheetScreenOn}
											/>
										</ul>
									</WNavbar>
								</WLHeader>
								<WLMain>
									<>
										<MapSelect
											auth={auth} fetchUser={props.fetchUser}
											user={props.user} handleMapDeletion={handleMapDeletion}
											setShowSpreadsheetScreen={setShowSpreadsheetScreen}
											maps={maps} regions={regions} activeMap={activeMap}
											createNewMap={createNewMap} editMapName={editMapName}
										/>
									</>
								</WLMain>
										{
											showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
										}

										{
											showLogin && (<Login fetchUser={props.fetchUser} /*refetchTodos={refetch}*/ setShowLogin={setShowLogin} toggleMapSelectScreen={toggleMapSelectScreen}/>)
										}
										{
											showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate}/>)
										}
										{
											showDeleteMap && (<DeleteMapModal deleteMap={deleteMap} setShowDeleteMap={setShowDeleteMap} activeMap_id={activeMap._id}/>)
										}
							</WLayout>
						: <Redirect from="/mapSelect" to="/regionSpreadsheet"/>
					: <Redirect exact from="/mapSelect" to="/welcome"/>}
					</>
				</Route>

				<Route path = "/regionSpreadsheet">
					{auth ?
					 !mapSelectScreen ?
						!regionViewerScreen ?
						<WLayout wLayout = "header">
							<WLHeader>
								<WNavbar color="colored">
									<ul>
										<WNavItem onClick={goHome}>
											<Logo className='logo' />
										</WNavItem>
									</ul>
									<ul>
										<NavbarOptions
											fetchUser={props.fetchUser} auth={auth} 
											setShowCreate={setShowCreate} setShowLogin={setShowLogin}
											setShowUpdate={setShowUpdate} userName={userName}
											toggleMapSelectScreen={toggleMapSelectScreen}
											spreadsheetScreenOn={spreadsheetScreenOn}
											activeMap={activeMap} activeRegion={activeRegion}
											maps={maps} regions={regions}
											viewedRegion={viewedRegion}
											setShowSpreadsheetScreen={setShowSpreadsheetScreen}
											toggleRegionViewerScreen={toggleRegionViewerScreen}
											resetTPSStack={resetTPSStack}
										/>
									</ul>
								</WNavbar>
							</WLHeader>
							<WLMain>
								<SpreadsheetScreen
									activeMap={activeMap} activeRegion={activeRegion /*We are sending both activeMap & activeRegion. In RegionEntry, we will check if activeRegion is null 
									or not and decide there whether to render the activeMap's subregions or the activeRegion's subregions*/}
									undo={tpsUndo} redo={tpsRedo}
									addRegion={addRegion} editRegion={editRegion} deleteRegion={deleteRegion}
									regions={regions}
									setShowSpreadsheetScreen={setShowSpreadsheetScreen}
									setShowRegionViewerScreen={setShowRegionViewerScreen}
									toggleRegionViewerScreen={toggleRegionViewerScreen}
									refetch2={refetch2}
									setViewedRegion={setViewedRegion}

									regionsOfParent={regionsOfParent}
									sortByColumn={sortByColumn}
									tpsHasUndo={tpsHasUndo} tpsHasRedo={tpsHasRedo}
								/>
								{
									showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate}/>)
								}
							</WLMain>
						</WLayout>
						: <Redirect exact from="/regionSpreadsheet" to="/regionViewerScreen"/>
					: <Redirect from="/regionSpreadsheet" to="/mapSelect"/>
					: <Redirect from="/regionSpreadsheet" to="/welcome"/>
					}
				</Route>

				<Route path = "/regionViewerScreen">
					{auth ?
						regionViewerScreen ? 
						<WLayout wLayout = "header">
							<WLHeader>
								<WNavbar color="colored">
									<ul>
										<WNavItem onClick={goHome}>
											<Logo className='logo' />
										</WNavItem>
									</ul>
									<ul>
										<NavbarOptions
											fetchUser={props.fetchUser} auth={auth} 
											setShowCreate={setShowCreate} setShowLogin={setShowLogin}
											setShowUpdate={setShowUpdate} userName={userName}
											toggleMapSelectScreen={toggleMapSelectScreen} 
											toggleRegionViewerScreen={toggleRegionViewerScreen}
											backToSpreadSheet={backToSpreadSheet}
											setShowSpreadsheetScreen={setShowSpreadsheetScreen}
											resetTPSStack={resetTPSStack}

											spreadsheetScreenOn={props.spreadsheetScreenOn}
											regionViewerScreen={regionViewerScreen}
											activeRegion={activeRegion} activeMap={activeMap}
											viewedRegion={viewedRegion}
											maps={maps} regions={regions}
										/>
									</ul>
								</WNavbar>
							</WLHeader>
							<WLMain>
								<RegionViewerScreen
									viewedRegion={viewedRegion} toggleRegionViewerScreen={toggleRegionViewerScreen}
									undo={tpsUndo} redo={tpsRedo}
								/>
								{
									showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate}/>)
								}
							</WLMain>
						</WLayout>
						
						: <Redirect from="/regionViewerScreen" to="/regionSpreadsheet"/>	
					: <Redirect from="/regionViewerScreen" to="/welcome"/>
					}
				</Route>
			</Switch>
		</BrowserRouter>
		</>
	);
};

export default Welcome;
