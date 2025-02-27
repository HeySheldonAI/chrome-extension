import { useState } from 'react';

import './App.css';
import SearchPrompt from './components/searchPrompt/searchPrompt';
import HelperPopup from './components/helperPopup/helperPopup';

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

	return isSearchPromptOpen ? (
		<SearchPrompt toggleSearchPrompt={(val) => setIsSearchPromptOpen(val)} />
	) : isHelperPopupOpen ? (
		<HelperPopup
			toggleHelperPrompt={(val) => setIsHelperPopupOpen(val)}
			toggleSearchPrompt={(val) => setIsSearchPromptOpen(val)}
		/>
	) : null;
};

export default App;
