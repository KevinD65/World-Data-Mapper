import React, { useState, useEffect } 	from 'react';
import { WLayout, WLHeader, WLSide, WLMain, WInput } from 'wt-frontend';
import LandmarkContents from './LandmarkContents';

const RegionViewerScreen = (props) => {
    const [input, setInput] = useState("");

    let RegionName, ParentRegion, RegionCapital, RegionLeader, NumSubregions, parent, locateViewedRegion;
    /*
    if(props.activeRegion === null){
        /*
        parent = props.activeMap;
        RegionName = props.activeMap.name;
        ParentRegion = "N/A";
        RegionCapital = props.activeMap.capital;
        RegionLeader = props.activeMap.leader;
        NumSubregions = props.activeMap.subregions.length;
        locateViewedRegion = props.maps.find(map => map._id === props.viewedRegion);
        parent = locateViewedRegion;
        RegionName = locateViewedRegion.name;
        ParentRegion = "N/A";
        RegionCapital = "N/A";
        RegionLeader = "N/A";
        NumSubregions = locateViewedRegion.subregions.length;
    }*/
    //else{
        console.log(props.viewedRegion);
        locateViewedRegion = props.regions.find(region => region._id === props.viewedRegion);
        if(!locateViewedRegion){ //viewed region is the map data file
            locateViewedRegion = props.maps.find(map => map._id === props.viewedRegion);
            parent = locateViewedRegion;
            RegionName = locateViewedRegion.name;
            ParentRegion = "N/A";
            RegionCapital = "N/A";
            RegionLeader = "N/A";
            NumSubregions = locateViewedRegion.subregions.length;
        }
        else{ //viewed region is a region
            let locateViewedRegionParent = props.regions.find(region => region._id === locateViewedRegion.parent);
            if(!locateViewedRegionParent){
                locateViewedRegionParent = props.maps.find(map => map._id === locateViewedRegion.parent);
            }
            parent = locateViewedRegion;
            RegionName = locateViewedRegion.name;
            ParentRegion = locateViewedRegionParent.name;
            RegionCapital = locateViewedRegion.capital;
            RegionLeader = locateViewedRegion.leader;
            NumSubregions = locateViewedRegion.subregions.length;
        }
    //}
    //let locateViewedRegion = 
    

    const updateInput = (e) => {
		//const { landmarkName, value } = e.target;
		//const updated = { ...input, [landmarkName]: value };
		setInput(e.target.value);
	}

    const handleAddLandmark = () => {
        let landmarkName = input;
        //console.log(parent);
        props.addLandmark(parent, landmarkName);
    }

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
                            <LandmarkContents
                                activeMap={props.activeMap} activeRegion={props.activeRegion}
                                editLandmark={props.editLandmark} viewedRegion={props.viewedRegion}
                                maps={props.maps} regions={props.regions} deleteLandmark={props.deleteLandmark}
                            />
                        </div>
                        <div className = "regionLandmarks-add-container" /*onClick for add landmark*/> 
                            <i className="material-icons addLandmark" onClick = {handleAddLandmark}>add</i>
                            <WInput className = "landmarkInput" autofocus={true} placeholderText="Enter landmark" type="text" wType="outlined" inputClass="table-input-class" 
                                onBlur={updateInput}/>
                        </div>
                    </div>
                </WLMain>
            </WLayout>
        </>
    );
}

export default RegionViewerScreen;