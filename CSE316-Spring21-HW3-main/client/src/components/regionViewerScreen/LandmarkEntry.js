import React, { useState } from 'react';
import { WInput, WRow }          from 'wt-frontend'
import WCol from 'wt-frontend/build/components/wgrid/WCol';

const LandmarkEntry = (props) => {
    const { data } = props;
    const landmarkName = data.name;
    const[editingLandmark, toggleEditing] = useState(false);

    let isDirectLandmark;
    //if()

    const handleLandmarkDelete = (e) => {

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
                <i className="material-icons" onClick={handleLandmarkDelete}>close</i>
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