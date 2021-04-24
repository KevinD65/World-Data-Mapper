import React        from 'react';
import RegionEntry   from './RegionEntry';

const SpreadsheetContents = (props) => {

    const entries = props.activeList ? props.activeList.items : null;
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <RegionEntry
                        data={entry} key={entry.id}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem} index={index}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default SpreadsheetContents;
