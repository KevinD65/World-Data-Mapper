import React, { useState } from 'react';
import { WInput, WRow }          from 'wt-frontend'
import WCol from 'wt-frontend/build/components/wgrid/WCol';

const LandmarkEntry = (props) => {
    const { data } = props;
    const landmarkName = data.name;
    const landmarkOwnerRegion = data.ownerRegion;
    const[editingLandmark, toggleEditing] = useState(false);

    console.log(props.activeMap._id);
    console.log(landmarkOwnerRegion);
    let isDirectLandmark = false;
    if(props.activeRegion === null){
        if(landmarkOwnerRegion === props.viewedRegion){
            isDirectLandmark = true;
        }
    }
    else{
        if(landmarkOwnerRegion === props.viewedRegion){
            isDirectLandmark = true;
        }
    }
    
    const handleLandmarkDelete = async (e) => {
        console.log("delete landmark HERE");
        let parentID = props.viewedRegion;
        await props.deleteLandmark(data, parentID);
    }

    const handleLandmarkEdit = (e) => {
        toggleEditing(false);
        const newLandmarkName = e.target.value ? e.target.value : "No Name";
        const previousLandmarkName = landmarkName;
        props.editLandmark(props.data._id, newLandmarkName, previousLandmarkName);
    }

    console.log(data.name);
    return(
        <WRow>
            <WCol>
                { isDirectLandmark ? 
                    <i className="material-icons landmarkDeleteButton" onClick={handleLandmarkDelete}>close</i>
                : <></>
                }
            </WCol>
            <WCol>
                {editingLandmark ? <WInput
                    className='table-input' onBlur={handleLandmarkEdit}
                    autoFocus={true} defaultValue={landmarkName} type='text'
                    wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    fillColor="default"
                />
                : <div className = "landmark-entry" onClick = {toggleEditing}>{landmarkName}</div>
                }
            </WCol>
        </WRow>
    );
}

export default LandmarkEntry;