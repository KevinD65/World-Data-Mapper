import React from 'react';
import LandmarkEntry from './LandmarkEntry';

const LandmarkContents = (props) => {

    let parentOfActive;
    if(props.activeRegion === null){
        parentOfActive = props.activeMap;
        console.log(parentOfActive.landmarks);
    }
    else{
        parentOfActive = props.activeRegion;
        console.log(props.activeRegion);
    }
    
    let landmarksToRender = parentOfActive.landmarks;
    console.log(props.viewedRegion);

return(
    landmarksToRender.map((entry, index) => (
        <LandmarkEntry
            data={entry} index={index} key={entry.id}
            activeMap={props.activeMap} activeRegion={props.activeRegion}
            editLandmark={props.editLandmark} viewedRegion={props.viewedRegion}
        />
    ))
);

};

export default LandmarkContents;
