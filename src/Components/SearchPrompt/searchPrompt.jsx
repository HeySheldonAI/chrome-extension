import { useEffect, useState, Fragment } from 'react';

import LoginPage from './loginPage/login.jsx';
import SearchInterface from './SearchInterface/searchInterface.jsx';

import './SearchPrompt.scss';

const SearchPrompt = ({ hideSearchPrompt }) => {
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

	const handleClick = () => {
		chrome.runtime.sendMessage({ action: 'sheldon_hide_search_prompt' });
	}

	return (
		<Fragment>
			<div className="background" onClick={ handleClick }></div>
			<div className="search_prompt">
				{hideSearchPrompt ? '': !isLoggedIn ? (
					<LoginPage />
					
				) : (
					<SearchInterface token={token} />
				)}
			</div>
		</Fragment>
	);
};

export default SearchPrompt;
