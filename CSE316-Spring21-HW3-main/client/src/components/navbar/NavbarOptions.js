import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        //console.log("LOGOUTTTTT");
        const { data } = await props.fetchUser();
        //console.log(data.name + " hi");
        if (data) {
            console.log("LOGOUTTTTT")
            let reset = await client.resetStore(); //THIS IS GETTING TRIGGERED AND CAUSES ERROR
            if (reset) props.toggleMapSelectScreen(false);
            //console.log("LOGOUTTTTT");
        }
    };

/*
    const getName = async () => { //infinite looping (I need this function to get the user's name in the navbar once they're logged in)
        let user = await props.fetchUser();
        return user.name;
    }
    let name = getName();
*/
    return (
        //add user's name here for updateaccount option
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={() => props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                    *NAME HERE*
                </WButton>
            </WNavItem >
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options acc" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn fetchUser={props.fetchUser} /*logout={props.logout}*/ toggleMapSelectScreen={props.toggleMapSelectScreen}/>
            }
        </>

    );
};

export default NavbarOptions;