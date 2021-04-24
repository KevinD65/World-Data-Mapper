import React            from 'react';
import SpreadsheetHeader      from './SpreadsheetHeader';
import SpreadsheetContents from './SpreadsheetContents';

const MapContents = (props) => {
    return (
        <div className='table ' >
            <SpreadsheetHeader
                disabled={!props.activeList._id} addItem={props.addItem}
                setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
            />
            <SpreadsheetContents
                key={props.activeList.id} activeList={props.activeList}
                deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                editItem={props.editItem}
            />
        </div>
    );
};

export default MapContents;