import React            from 'react';
import MapList            from './MapList';

const MapContents = (props) => {

    return (
        <div className='table ' >
            <MapList
                maps={props.maps} activeMap={props.activeMaps} 
                deleteMap={props.deleteMap} updateMapName={props.updateMapName}
            />
        </div>
    );
};

export default MapContents;