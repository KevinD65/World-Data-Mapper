import React        from 'react';
import MapEntry from './MapEntry';

const MapList = (props) => {
    return (
        <>
            {
                props.maps &&
                props.maps.map(map => (
                    <MapEntry
                        key={map.id}
                        handleSetActive={props.handleSetActive}
                        id={map.id} name={map.name} _id={map._id}
                        deleteMap={props.deleteMap} updateMapName={props.updateMapName}
                        toggleSpreadsheetScreen={props.toggleSpreadsheetScreen}
                        handleMapDeletion={props.handleMapDeletion}
                    />
                ))
            }
        </>
    );
};

export default MapList;