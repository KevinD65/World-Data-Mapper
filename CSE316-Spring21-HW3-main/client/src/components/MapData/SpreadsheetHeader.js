import React from 'react';
import { WLHeader, WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const clickDisabled = () => { };

    return (
        <div className = "">
            <WRow className = "spreadsheet-header">
				<i className="material-icons addRegion" onClick = {props.addRegion}>add</i>
			</WRow>
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