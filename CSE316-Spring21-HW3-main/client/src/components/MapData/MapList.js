import React        from 'react';
import MapEntry from './MapEntry';

const MapList = (props) => {
    return (
        <>
            {
                props.maps &&
                props.maps.map(map => (
                    <MapEntry
                        handleSetActive={props.handleSetActive}
                        id={map.id} name={map.name} _id={map._id}
                        deleteMap={props.deleteMap} updateMapName={props.updateMapName}
                    />
                ))
            }
        </>
    );
};

export default MapList;