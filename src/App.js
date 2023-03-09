import { useState } from 'react';

import './App.css';
import SearchPrompt from './Components/SearchPrompt/searchPrompt';
import HelperPopup from './Components/HelperPopup/HelperPopup';

const App = () => {
	const [isSearchPromptOpen, setIsSearchPromptOpen] = useState(false);
	const [isHelperPopupOpen, setIsHelperPopupOpen] = useState(true);

	// eslint-disable-next-line no-undef
	chrome.runtime.onMessage.addListener((message) => {
		if (message.action !== 'sheldon_toggle_search_prompt') return;

		if (isHelperPopupOpen) {
			if (!isSearchPromptOpen) {
				setIsHelperPopupOpen(false);
				setIsSearchPromptOpen(true);
			} else setIsSearchPromptOpen(false);
		} else setIsSearchPromptOpen(!isSearchPromptOpen);
	});

	return (
		<div>
			{isSearchPromptOpen ? (
				<span id="search">
					<SearchPrompt toggleSearchPrompt={(val) => setIsSearchPromptOpen(val)} />
				</span>
			) : isHelperPopupOpen ? (
				<HelperPopup
					toggleHelperPrompt={(val) => setIsHelperPopupOpen(val)}
					toggleSearchPrompt={(val) => setIsSearchPromptOpen(val)}
				/>
			) : null}
		</div>);
};

export default App;
