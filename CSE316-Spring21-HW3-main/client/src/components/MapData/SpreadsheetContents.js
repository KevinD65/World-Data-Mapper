import React        from 'react';
import RegionEntry   from './RegionEntry';

const SpreadsheetContents = (props) => {

    let regionsIDs = [];
    console.log(props.activeRegion);
    if(/*props.activeRegion[0] === null ||*/ props.activeRegion === undefined /*|| props.activeRegion.length === 0*/){ //might not need this portion of the if statement
        regionsIDs = props.activeMap.subregions;
        console.log("NULLBOI");
    }
    else if(/*props.activeRegion[0] === undefined &&*/ props.activeRegion === null){ //if null, we must load activeMap's subregions
        console.log(props.activeMap);
        //console.log(props.activeRegion[0]);
        regionsIDs = props.activeMap.subregions;
        console.log(regionsIDs);
    }
    else{ //in the case that it's not null, we must load the activeRegion's subregions
        regionsIDs = props.activeRegion.subregions;
        console.log(regionsIDs);
        console.log("JAH");
    }
/*
    let regions = props.regions;
    let myRegions = [];
    console.log(regions);
    //console.log(regionsIDs);
    
    let regionToFind;
    for(let i = 0; i < regionsIDs.length; i++){
        regionToFind = regions.find(region => region._id === regionsIDs[i]);//search the master list of all regions for the regions associated with this parent
        myRegions.push(regionToFind);
    }
    console.log(myRegions);
*/
    console.log("COMPONENT IS RENDERING");
    return (
        /*myRegions*/props.regionsOfParent.map((entry, index) => (
            <RegionEntry
                data={entry} key={entry.id} index={index}
                deleteRegion={props.deleteRegion} editRegion={props.editRegion} 
                setShowSpreadsheetScreen={props.setShowSpreadsheetScreen}
                setShowRegionViewerScreen={props.setShowRegionViewerScreen}
                toggleRegionViewerScreen={props.toggleRegionViewerScreen}
                setViewedRegion={props.setViewedRegion}
            />
        ))
    );
};

export default SpreadsheetContents;
