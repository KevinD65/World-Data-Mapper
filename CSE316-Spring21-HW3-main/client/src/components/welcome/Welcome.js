import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
//import MapContents 					from '../main/MapContents';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
//import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
/*import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';
import WInput from 'wt-frontend/build/components/winput/WInput';*/
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MapSelect from '../mapSelectScreen/MapSelect';


const Welcome = (props) => {

	//let todolists 							= [];
	//const [activeList, setActiveList] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]	= useState(false);

	//const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS);
	//const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
	//const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD);
	//const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	//const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	//const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	//const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);

	const [mapSelectScreen, toggleMapSelectScreen] = useState(false);

/*
	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { todolists = data.getAllTodos; }
*/
	const auth = props.user === null ? false : true;
	//console.log(props.user + auth + "hello");

	const getUserName = () => {
		if(auth) {
			return props.user.name;
		}
		else{
			return "";
		}
	}
	
	/*
		Since we only have 3 modals, this sort of hardcoding isnt an issue, if there
		were more it would probably make sense to make a general modal component, and
		a modal manager that handles which to show.
	*/
	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	}

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	}

	return (
		<>
		<BrowserRouter>
			<Switch>
				<Route path = "/welcome">
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
										toggleMapSelectScreen={toggleMapSelectScreen}
										userName={getUserName} setShowUpdate={setShowUpdate}
									/>
								</ul>
							</WNavbar>
						</WLHeader>

						<WLMain>
							{!auth ? 
								<>
									<Redirect exact from="/welcome/mapSelect" to={ {pathname: "/welcome"} } />
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
								</>
								:<Redirect exact from="/welcome" to={ {pathname: "/welcome/mapSelect"} } />
							}
						</WLMain>
					</WLayout>
				</Route>
				<Route path = "/welcome/mapSelect" 
					path = "/welcome/mapSelect" 
					name = "/mapSelect"
					render = {() => <MapSelect/>}/>

				<Route path = "/regionViewer">
					
				</Route>
			</Switch>
		</BrowserRouter>
		</>
	);
};

export default Welcome;
