import { useState, useEffect } from 'react';
// import { getData, setData } from './helpers/localStorage';
import Search from './Search/Search';
import Popup from './Popup/Popup';

const App = () => {
	const [isSearchPromptOpen, setIsSearchPromptOpen] = useState(false);
	const [isHelperPopupOpen, setIsHelperPopupOpen] = useState(false);

	useEffect(() => {
		const currentLink = document.getElementsByTagName('body')[0].baseURI
			? document.getElementsByTagName('body')[0].baseURI
			: '';

		// get website name from currentWebsite
		const websiteName = currentLink.split('/')[2];
		if (!websiteName || websiteName === '') {
			return;
		}

		// TODO: DO SOME PROCESSING FOR THE HELPER POPUP

		setIsHelperPopupOpen(true);
	}, []);

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.action !== 'clicked') return;

		if (isHelperPopupOpen) {
			if (!isSearchPromptOpen) {
				setIsHelperPopupOpen(false);
				setIsSearchPromptOpen(true);
			} else setIsSearchPromptOpen(false);
		} else setIsSearchPromptOpen(!isSearchPromptOpen);
	});

	return isSearchPromptOpen ? (
		<Search toggleFunction={setIsSearchPromptOpen} />
	) : isHelperPopupOpen ? (
		<Popup toggleFunction={setIsHelperPopupOpen} />
	) : null;
};

export default App;
