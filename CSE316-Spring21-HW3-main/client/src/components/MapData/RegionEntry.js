import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const RegionEntry = (props) => {
    const { data } = props;

    //const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';

    const _id = data._id;
    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const flag = data.flag;
    const landmarksArr = data.landmarks;
    console.log(name);
    const landmarks = ""; //string of all the landmarks in a comma separated list for display purposes
    if(landmarksArr !== undefined){
        for(let i = 0; i < landmarksArr.length; i++){
            landmarks += landmarksArr[i] + ", ";
        }
    }

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        props.editItem(data._id, 'name', newName, prevName);
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        props.editItem(data._id, 'capital', newCapital, prevCapital);
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        props.editItem(data._id, 'leader', newLeader, prevLeader);
    };

    const handleGoToViewer = () => {
        props.toggleRegionViewerScreen(true);
        console.log(data);
        props.setViewedRegion(data._id); //changed from data to data._id
    }

    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => props.setShowSpreadsheetScreen(props.data._id, true, false)/*toggleNameEdit(!editingName)*/}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="3">
                {
                    editingCapital || capital === '' 
                    ?<WInput
                        className='table-input' onBlur={handleCapitalEdit}
                        autoFocus={true} defaultValue={capital} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                    : <div className="table-text"
                        onClick={() => toggleCapitalEdit(!editingCapital)}
                    >{capital}
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader || leader === '' 
                    ?<WInput
                        className='table-input' onBlur={handleLeaderEdit}
                        autoFocus={true} defaultValue={leader} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                    : <div className="table-text"
                        onClick={() => toggleLeaderEdit(!editingLeader)}
                    >{leader}
                    </div>
                }
            </WCol>

            <WCol size="1">
                {
                    <div className = "spreadsheet-flags">FLAG</div>
                }
            </WCol>

            <WCol size="4" onClick = {handleGoToViewer}>
                <div className = "spreadsheet-landmarks">
                    {landmarks}
                </div>
            </WCol>
        </WRow>
    );
};

export default RegionEntry;
