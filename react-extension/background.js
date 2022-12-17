/* eslint-disable no-undef */

chrome.action.onClicked.addListener(async (tab) => {
	chrome.tabs.sendMessage(tab.id ? tab.id : 0, { message: 'clicked' });
});
