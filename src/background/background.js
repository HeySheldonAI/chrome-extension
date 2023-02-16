/* eslint-disable no-undef */

import checkLogin from './helpers';

// Listens if the action button is clicked or the shortcut key is pressed.
chrome.action.onClicked.addListener(async (tab) => {
	chrome.tabs.sendMessage(tab.id, {
		action: 'sheldon_toggle_search_prompt',
	});
});

// Checks if the cookies exist in the user dashboard. Send boolean value to the content script with key: payload: { isLoggedIn: true/false }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'sheldon_check_login') {
		checkLogin();
		return true;
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'sheldon_login') {
		checkLogin();
		return true;
	}
});

chrome.runtime.onMessageExternal.addListener(
	(request, sender, sendResponse) => {
		if (request.action === 'sheldon_connect') {
			sendResponse({
				responseType: 'success',
				responseUniqueCode: 'sheldon_connection_success',
				responsePayload: null,
			});

			return true;
		}
	}
);

// Send messages from background to other scripts
// 1. Shortcut key is pressed / Action button is clicked
// 2. Listen for tab changes, get current tab's URL, check if the url is present in the list of URLs at which the helper popup was closed or if the time since the last time the helper popup was closed is less than 1 week, if yes, then don't show the helper popup. If no, send message to show the helper popup.

// Receive messages from other scripts
// 1. Message to verify if the extension is installed or not from user dashboard
// 2. Message to send a fetch request for searching.
// 3. Message to login the user, close the search prompt, open the new tab.
// 4. Message to verify if the user is logged in or not.
// 5. message to logout
// 6. Receives a login and logout message from the user dashboard.
