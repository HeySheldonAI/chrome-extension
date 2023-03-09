import { useEffect, useState, Fragment } from 'react';

import LoginPage from './loginPage/login.jsx';
import SearchInterface from './SearchInterface/searchInterface.jsx';

import './SearchPrompt.scss';

const SearchPrompt = ({ toggleSearchPrompt }) => {
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

	const hideSearchPrompt = () => {
		toggleSearchPrompt(false);
	}

	return (
		<Fragment>
			<div className="background" onClick={ hideSearchPrompt }></div>
			<div className="search_prompt">
				{ !isLoggedIn ? (
					<LoginPage />
					
				) : (
					<SearchInterface token={token} />
				)}
			</div>
		</Fragment>
	);
};

export default SearchPrompt;
