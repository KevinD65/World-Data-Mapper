import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import RegionViewerScreen from '../regionViewerScreen/RegionViewerScreen';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);
    let parent, regionName;
    console.log(props.viewedRegion);

    let myMaps = props.maps;
    let myRegions = props.regions;

    console.log(props.activeRegion);
    console.log(props.activeMap);
/*
    if(props.activeRegion === null)
        parent = props.activeMap;
    else if(props.activeRegion === undefined)
        parent = props.activeMap;
    else{
        parent = props.activeRegion[0];
    }*/

    //console.log(myRegions);
    if(props.spreadsheetScreenOn || props.regionViewerScreen){
        if(props.activeRegion === "ROCKSOLID" && props.activeRegion === null){ //might not be needed
            console.log("GET PRANKED");
            console.log(props.activeMap);
            //parent = props.activeMap[0].name;
            regionName = props.viewedRegion.name;
        }
        else if(/*props.activeRegion[0] === undefined*/ props.activeRegion === null){ //for regions of map data files
            console.log("like a someboody");
            //console.log(props.activeRegion[0]);
            parent = props.activeMap.name;
            if(props.viewedRegion === undefined){ //landmark view of the map data file itself
                regionName = parent;
                parent = "";
            }
            else{
                regionName = props.viewedRegion.name;
            }
        }
        else{ //for regions of regions
            console.log("VERY NICE");
            //console.log(props.activeRegion[0]);
            let parentID = props.activeRegion._id;
            parent = myRegions.find(region => region._id === parentID);
            if(parent !== undefined){
                parent = parent.name;
            }
            if(props.viewedRegion === undefined){ //landmark view of the map data file itself
                regionName = parent;
                parent = "";
            }
            else{
                regionName = props.viewedRegion.name;
            }
        }
        //console.log(parent);
        //console.log(regionName);
}

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.toggleMapSelectScreen(false);
        }

    };

    const backToSpreadSheet = () => {
        
    }

    return (
        //add user's name here for updateaccount option
        <> { props.regionViewerScreen || props.spreadsheetScreenOn ?
            <WNavItem className = "regionViewerNavigation" hoverAnimation="lighten">
                <div onClick = {props.backToSpreadSheet}>
                    {parent}
                </div>
                <i className="material-icons">chevron_right</i>
                <div>
                    {regionName}
                </div>
            </WNavItem>
            :<></>
            }
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                    {props.userName}
                </WButton>
            </WNavItem >
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {

    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options acc" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}/>
                : <LoggedIn fetchUser={props.fetchUser} userName={props.userName} toggleMapSelectScreen={props.toggleMapSelectScreen} setShowUpdate={props.setShowUpdate} 
                    viewedRegion={props.viewedRegion} maps={props.maps} regions={props.regions} activeMap={props.activeMap} activeRegion={props.activeRegion}
                    spreadsheetScreenOn={props.spreadsheetScreenOn} regionViewerScreen={props.regionViewerScreen} backToSpreadSheet={props.backToSpreadSheet}/>
            }
        </>

    );
};

export default NavbarOptions;