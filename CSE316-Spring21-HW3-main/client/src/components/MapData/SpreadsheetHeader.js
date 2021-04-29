import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const clickDisabled = () => { };

    return (
        <div className = "">
            <WRow className = "spreadsheet-header">
				<i className="material-icons addRegion" onClick = {addRegion}>add</i>
			</WRow>
            <WCHeader className = "spreadsheet-header">
                <WRow>
                    <WCol size="2">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Name<i className="material-icons spreadsheetHeaderIcon">south</i></WButton> 
                    </WCol>

                    <WCol size="3">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Capital</WButton>
                    </WCol>

                    <WCol size="2">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Leader</WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Flag</WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton className='spreadsheet-header-section' wType="texted" span="true">Landmarks</WButton>
                    </WCol>
                </WRow>
            </WCHeader>
            <WMMain>

            </WMMain>
        </div>
    );
};

export default SpreadsheetHeader;