 /*global chrome*/
import { useState } from 'react';

import './SearchPrompt.scss';

const SearchPrompt = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState('');

	const handleLogin = () => {
		console.log("hi")
		chrome.runtime.sendMessage({ action: 'sheldon_login' }, (response) => {
			console.log(response);
			if (response.token) {
				setIsLoggedIn(true);
				console.log(response.token);
				setToken(response.token);
			}
		});
	};

	const handleLogout = () => {
		chrome.runtime.sendMessage(
			{ action: 'sheldon_logout', token: token },
			(response) => {
				console.log(response);
			}
		);
	};

	return (
		<div className="search_prompt">
			{!isLoggedIn ? (
				<button className="google_login" onClick={handleLogin}>
					Login
				</button>
			) : (
				<div className="google_login" onClick={handleLogout}>
					Logout
				</div>
			)}
			<h1 style={{color:"white"}}>hello</h1>
		</div>
	);
};

export default SearchPrompt;
