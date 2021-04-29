import React from 'react';
import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteMapModal = (props) => {

    const handleDelete = async () => {
        console.log("myID " + props.activeMap_id);
        props.deleteMap(props.activeMap_id);
        props.setShowDeleteMap(false);
    }

    //console.log("HERE SAFE");

    return (
        <WModal className="delete-modal">
            <div className="modal-header" onClose={() => props.setShowDeleteMap(false)}>
                Delete List?
			</div>

            <div>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteMap(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </div>
        </WModal>
    );
}

export default DeleteMapModal;