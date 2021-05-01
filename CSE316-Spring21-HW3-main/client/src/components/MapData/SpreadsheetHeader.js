import React from 'react';
import { WLHeader, WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const clickDisabled = () => { };

    let parent;
    if(props.activeRegion[0] === null)
        parent = props.activeMap;
    else if(props.activeRegion[0] === undefined)
        parent = props.activeMap;
    else{
        parent = props.activeRegion[0];
    }

    return (
        <div className = "">
            <div className = "spreadsheet-header">
                <div className="spreadsheet-header-container">
                    <i className="material-icons addRegion" onClick = {() => props.addRegion(parent._id)}>add</i>
                    <i className="material-icons undo" onClick = {props.undo}>undo</i>
                    <i className="material-icons redo" onClick = {props.redo}>redo</i>
                    <div className="spreadsheet-header-text">
                        {"Region Name: "}
                    </div>
                    <div className="spreadsheet-header-name">
                        {parent.name}
                    </div>
                </div>
			</div>
            <WLHeader className = "spreadsheet-header headerLabels">
                <WRow>
                    <WCol size="2">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Name<i className="material-icons spreadsheetHeaderIcon">south</i></WButton> 
                    </WCol>

                    <WCol size="3">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Capital<i className="material-icons spreadsheetHeaderIcon">south</i></WButton>
                    </WCol>

                    <WCol size="2">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Leader<i className="material-icons spreadsheetHeaderIcon">south</i></WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Flag<i className="material-icons spreadsheetHeaderIcon">south</i></WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Landmarks<i className="material-icons spreadsheetHeaderIcon">south</i></WButton>
                    </WCol>
                </WRow>
            </WLHeader>
        </div>
    );
};

export default SpreadsheetHeader;