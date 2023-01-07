/* eslint-disable no-undef */

chrome.action.onClicked.addListener(async (tab) => {
	chrome.tabs.sendMessage(tab.id, {
		action: 'sheldon_toggle_search_prompt',
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'sheldon_login') {
		chrome.cookies.getAll({}, (cookies) => {
			console.log(cookies);
		});

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
