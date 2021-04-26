import React, { useState }  from 'react';
import { WNavItem, WInput } from 'wt-frontend';

const MapEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    //const [preEdit, setPreEdit] = useState(props.name); //name prior to change for undo/redo

    const handleEditing = (e) => {
        e.stopPropagation();
        //setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateMapName(props._id, name, value);
    };

    //const entryStyle = props.id === props.activeid ? 'list-item list-item-active' : 'list-item ';
    
    return (
        <WNavItem 
            className="MapName" onDoubleClick={handleEditing} 
            onClick={() => { props.handleSetActive(props.id) }} hoverAnimation="lighten"
        >
            {
                editing ? <WInput className="map-edit" inputClass="map-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} />
                    :   <div className='list-text'>
                            {props.name}
                        </div>
            }
        </WNavItem>
    );
};

export default MapEntry;