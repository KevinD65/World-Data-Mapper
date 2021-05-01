import React        from 'react';
import RegionEntry   from './RegionEntry';

const SpreadsheetContents = (props) => {

    let regionsIDs = [];
    if(props.activeRegion[0] === null){
        regionsIDs = props.activeMap.subregions;
        console.log("NULLBOI");
    }
    else if(props.activeRegion[0] === undefined){
        regionsIDs = props.activeMap.subregions;
        console.log(regionsIDs);
    }
    else{
        regionsIDs = props.activeRegion[0].subregions;
        console.log("JAH");
    }

    //const regionsIDs = props.activeRegion !== {} ? props.activeRegion[0].subregions : props.activeMap.subregions;
    let regions = props.regions;
    console.log(regions);
    let regionToFind;
    for(let i = 0; i < regionsIDs.length; i++){
        regionToFind = regions.find(region => region._id === regionsIDs[i]);//search the master list of all regions for the regions associated with this parent
        regions.push(regionToFind);
    }

    return (
        regions.map((entry, index) => (
            <RegionEntry
                data={entry} key={entry.id}
                deleteItem={props.deleteItem} editItem={props.editItem} 
                index={index}
            />
        ))
    );
};

export default SpreadsheetContents;
