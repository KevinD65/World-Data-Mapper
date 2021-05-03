import React, { useState, useEffect } 	from 'react';
import { WLayout, WLHeader, WLSide, WLMain, WInput } from 'wt-frontend';

const RegionViewerScreen = (props) => {

    let RegionName, ParentRegion, RegionCapital, RegionLeader, NumSubregions;

    return(
        <>
            <div className = "regionViewer-header-spacer"></div>
            <WLayout wLayout = "header" className = "regionViewer-body"> 
            {/* <div className = "regionViewer-header-container"></div> */}
                <WLHeader>
                    <i className="material-icons undo" onClick = {props.undo}>undo</i>
                    <i className="material-icons redo" onClick = {props.redo}>redo</i>
                </WLHeader>
                <WLMain>
                    <div className="RegionViewerLeftSide">
                        <div className = "RegionViewerImageContainer">
                            <div className = "RegionViewerImage">Image Here</div>
                        </div>
                        <div className="modal-spacer">&nbsp;</div>
                        {/* spacing here between image and region information */}
                        <div className = "RegionViewerInfoContainer">
                            <div className = "RegionViewerInfo">
                                Region Name: {RegionName}
                            </div>
                        </div>
                        <div className = "RegionViewerInfoContainer">
                            <div className = "RegionViewerInfo">
                                Parent Region: {ParentRegion}
                                <i className="material-icons" /*Something here to change parent region*/>edit</i>
                            </div>
                        </div>
                        <div className = "RegionViewerInfoContainer">
                            <div className = "RegionViewerInfo">
                                Region Capital: {RegionCapital}
                            </div>
                        </div>
                        <div className = "RegionViewerInfoContainer">
                            <div className = "RegionViewerInfo">
                                Region Leader: {RegionLeader}
                            </div>
                        </div>
                        <div className = "RegionViewerInfoContainer">
                            <div className = "RegionViewerInfo">
                                # of Sub Regions: {NumSubregions}
                            </div>
                        </div>
                    </div>
                    <div className = "RegionViewerRightSide">
                        <div className = "regionLandmarks-header">Region Landmarks:</div>
                        <div className = "regionLandmarks">
                            {/* render landmarks here */}
                        </div>
                        <div className = "regionLandmarks-add-container" /*onClick for add landmark*/> 
                            <i className="material-icons addLandmark">add</i>
                            <WInput className = "landmarkInput" autofocus={true} placeholderText="Enter landmark" type="text" wType="outlined" inputClass="table-input-class"/>
                        </div>
                    </div>
                </WLMain>
            </WLayout>
        </>
    );
}

export default RegionViewerScreen;