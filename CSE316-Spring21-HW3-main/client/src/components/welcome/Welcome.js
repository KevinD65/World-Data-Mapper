import React, { useState, useEffect } 						from 'react';
//import components/modals
import Logo 												from '../navbar/Logo';
import NavbarOptions 										from '../navbar/NavbarOptions';
import MapSelect 											from '../mapSelectScreen/MapSelect';
import SpreadsheetScreen                                    from '../spreadsheetScreen/SpreadsheetScreen';

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
	EditItem_Transaction } 				from '../../utils/jsTPS';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';

const Welcome = (props) => {
	//define all screen/modal hooks
	const [showDeleteMap, toggleShowDeleteMap] 				= useState(false);
	const [showLogin, toggleShowLogin] 						= useState(false);
	const [showCreate, toggleShowCreate] 					= useState(false);
	const [showUpdate, toggleShowUpdate]					= useState(false);
	const [spreadsheetScreenOn, toggleSpreadsheetScreen]	= useState(false);
	const [mapSelectScreen, toggleMapSelectScreen] 			= useState(false);
	const [home, toggleHome]								= useState(false);

	//define mutations/queries needed
	//const [GetUser]											= useQuery(queries.GET_DB_USER);
	const [AddMap] 											= useMutation(mutations.ADD_MAP);
	const [DeleteMap] 										= useMutation(mutations.DELETE_MAP);
	const [UpdateMapName]									= useMutation(mutations.UPDATE_MAP_NAME);
	const [AddRegion]										= useMutation(mutations.ADD_REGION);
	const [DeleteRegion]									= useMutation(mutations.DELETE_REGION)
	const [Logout] 											= useMutation(mutations.LOGOUT);

	let maps = []; //holds all the maps
	let regions = []; //holds all the regions
	//let user = useQuery(queries.GET_DB_USER);
	//const myUser = user.data.getCurrentUser.name;
	//console.log(props.user);
	//console.log("HJAWOIUHFWNN");
	const client = useApolloClient();
    const [activeMap, setActiveMap] = useState({}); //an array holding a singular map object (or none)
	const [activeRegion, setActiveRegion] = useState({}); //an array holding a singular region object (or none)
	useEffect(() => {
		console.log(activeMap);
		console.log("useEffect");

	}, [activeMap]);

	const { loading, error, data, refetch } = useQuery(queries.GET_DB_MAPS);
	const regionQuery = useQuery(queries.GET_DB_REGIONS);
	//const regionQuery = useQuery(queries.GET_DB_REGIONS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { maps = data.getAllMaps; }

	//These lines of code cause error 400 on logout();
	//const regionQuery = useQuery(queries.GET_DB_REGIONS);
	if(regionQuery.loading) { console.log(loading, 'loading'); }
	if(regionQuery.error) { console.log(error, 'error'); }
	if(regionQuery.data) { regions = regionQuery.data.getAllRegions; }
	const refetch2 = regionQuery.refetch;

	const userName = props.userName;

    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps;
			if (activeMap) {
				let tempID = activeMap._id; 
				let myMap = maps.find(map => map._id === tempID);
				setActiveMap(myMap);
			}
		}
	}

	const refetchRegions = async (refetch) => {
		const regionRefetch = await refetch();
		if(regionRefetch.data) {
			regions = regionRefetch.data.getAllRegions;
			console.log(regionRefetch.data);
		}
	}

	const auth = props.user === null ? false : true; //used to check if a user is logged in

    const handleLogout = async () => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) toggleMapSelectScreen(false);
        }
    };

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

	const handleMapDeletion = (_id) => {
		handleSetActive(_id);
		toggleShowDeleteMap(!showDeleteMap);
		//console.log(showDeleteMap);
		//setShowDeleteMap();
	}

	const setShowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
	}

	const handleSetActive = (id) => {
		const map = maps.find(map => map.id === id || map._id === id);
		setActiveMap(map);
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

	const addRegion = async (parentID) => { //needs parent path as argument
		let map;
		let updatedPath = [];
		if(activeRegion[0] == null || activeRegion[0] == undefined){
			map = activeMap;
			updatedPath.push(map._id);
		}
		else{
			map = activeRegion;
			updatedPath = map.path;
			updatedPath.push(map.name);
		}
		console.log(map);
		const regions = map.subregions;
		const lastID = regions.length >= 1 ? regions[regions.length] : 0;
        const lastPosition = regions.length >= 1 ? regions[regions.length - 1].position + 1 : 0;
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
		};
		let opcode = 1;
		let regionID = newRegion._id;
		let transaction = new UpdateSpreadsheetItems_Transaction(parentID, regionID, newRegion, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
		await refetchRegions(refetch2);
	};

	const deleteRegion = async () => {

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
	const setShowSpreadsheetScreen = async (parentID) => {
		//needs to be compatiable with both a map data file or a region
		console.log("parent" + parentID);
		toggleMapSelectScreen(false);
		toggleSpreadsheetScreen(true);
		handleSetActive(parentID);
		//console.log("ACTIVE MAP: " + activeMap._id);
		const selectedRegion = maps.find(map => map._id === parentID); 
		//console.log("OHMYGOD" + selectedRegion._id);
		/*
		if(selectedRegion === undefined) //a region was selected, not a map data file
			//search regions array and compile an array of all the regions associated with the parent
			console.log("placeholder");*/
	}


	//let history = useHistory();

	const goHome = () =>{
		toggleSpreadsheetScreen(false);
		toggleMapSelectScreen(true);
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
										toggleMapSelectScreen={toggleMapSelectScreen}
									/>
								</ul>
							</WNavbar>
						</WLHeader>

						<WLMain>
							{!auth ? 
								<>
									<Redirect exact from="/mapSelect" to={ {pathname: "/welcome"} } />
									<div className="container-secondary">
										
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
								:<Redirect exact from="/welcome" to="/mapSelect" /*{ {pathname: "/welcome/mapSelect"} }*/ />
							}
						</WLMain>
					</WLayout>
					{/* } */}
				</Route>

				<Route 
					path = "/mapSelect" 
					name = "/mapSelect">
						{/* {JSON.parse(props.user))} */}
					<>
					{auth ?
						!spreadsheetScreenOn ?
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
												setShowUpdate={setShowUpdate} userName={userName}/*Need a prop for the user's name*/
												toggleMapSelectScreen={toggleMapSelectScreen}
											/>
										</ul>
									</WNavbar>
								</WLHeader>
								<WLMain>
									<>
										<MapSelect /*send props here*/
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
										setShowUpdate={setShowUpdate} userName={userName}/*Need a prop for the user's name*/
										toggleMapSelectScreen={toggleMapSelectScreen}
									/>
								</ul>
							</WNavbar>
						</WLHeader>
						<WLMain>
							<SpreadsheetScreen
								activeMap={activeMap} activeRegion={activeRegion /*We are sending both activeMap & activeRegion. In RegionEntry, we will check if activeRegion is empty 
								or not and decide there whether to render the activeMap's subregions or the activeRegion's subregions*/}
								undo={tpsUndo} redo={tpsRedo}
								addRegion={addRegion} 
								regions={regions}
							/>
						</WLMain>
					</WLayout>
					: <Redirect from="/regionSpreadsheet" to="/mapSelect"/>
					: <Redirect from="/regionSpreadsheet" to="/welcome"/>
					}
				</Route>

				<Route>

				</Route>
			</Switch>
		</BrowserRouter>
		</>
	);
};

export default Welcome;
