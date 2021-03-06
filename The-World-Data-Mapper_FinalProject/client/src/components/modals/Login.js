import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hasClientExports } from '@apollo/client/utilities';
import {useHistory } from 'react-router-dom';


const Login = (props) => {
	let history = useHistory();
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {
		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			let a = await props.fetchUser();
			toggleLoading(false)
			props.setShowLogin(false)
		};
		history.push("/MapSelection/" +data.login._id);

	};
		return (
			<WModal className="modal" cover="true" visible={props.setShowLogin}>
				<WMHeader  className="modal-header" onClose={() => props.setShowLogin(false)}>
					Login
				</WMHeader >

				{
					loading ? <div />
						: <WMMain className="main-login-modal">

							<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' />
							<div className="modal-spacer">&nbsp;</div>
							<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' />

							{
								showErr ? <div className='modal-error'>
									{errorMsg}
								</div>
									: <div className='modal-error'>&nbsp;</div>
							}

						</WMMain >
				}
				<WMFooter>
				<WRow>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
							Login
						</WButton>				
					</WCol>

					<WCol size="4">
						<div >&nbsp;</div>
					</WCol>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button" onClick={() => props.setShowLogin(false)} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
							Cancel
						</WButton>				
					</WCol>
							
				</WRow>

				</WMFooter>
			</WModal >
		);
}

export default Login;