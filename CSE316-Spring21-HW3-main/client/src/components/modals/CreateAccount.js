import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowCreate(false);

		};
	};

	return (
		<WModal className="signup-modal">
			<div className="modal-header" onClose={() => props.setShowCreate(false)}>
				Create A New Account
			</div>
			<WButton className = "modal-x" onClick ={ () => props.setShowCreate(false)}>X</WButton>

			{
				loading ? <div />
					: <div>
						<WRow className="modal-col-gap signup-modal">
						<div className = "modal-input-label" >Name: </div>
							<WCol size="6">
								<WInput 
									className="modal-input-field" onBlur={updateInput} name="name" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Name Here*" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
						<div className = "modal-input-label" >Email: </div>
							<WCol size = "6">
								<WInput 
									className="modal-input-field" onBlur={updateInput} name="email" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Email Here*" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>
						<WRow className="modal-col-gap signup-modal">
						<div className="modal-spacer">&nbsp;</div>
						<div className = "modal-input-label" >Password: </div>
							<WCol size = "6">
								<WInput 
									className="modal-input-field" onBlur={updateInput} name="password" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Password Here*" wType="outlined" inputType="password" 
								/>
							</WCol>
						</WRow>
					</div>
			}
			<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
				Submit
			</WButton>
			<WButton className="modal-button" onClick={() => props.setShowCreate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
				Cancel
			</WButton>
		</WModal>
	);
}

export default CreateAccount;
