import { useEffect, useState } from 'react';

import LoginPage from './loginPage/login.jsx';
import SearchInterface from './SearchInterface/searchInterface.jsx';

import './SearchPrompt.scss';

const SearchPrompt = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState('');

	useEffect(() => {
		chrome.runtime.sendMessage({ action: 'sheldon_check_login' }, response => {
			if (response.loggedIn) {
				setIsLoggedIn(true);
				setToken(response.token);
			}
		});
	}, []);

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
				<LoginPage />
			) : (
				<SearchInterface token={token} />
			)}
			<h1 style={{color:"white"}}>hello</h1>
		</div>
	);
};

export default SearchPrompt;
