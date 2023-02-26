import { useEffect, useState } from 'react';

import LoginPage from './loginPage/login.jsx';
import SearchInterface from './SearchInterface/searchInterface.jsx';

import './searchPrompt.scss';

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
		</div>
	);
};

export default SearchPrompt;
