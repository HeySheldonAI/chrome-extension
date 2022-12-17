chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: 'OFF',
	});
});

const extensions = 'linkedin.com/';

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	console.log(111, tab);
// 	chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
// 		console.log(tabs);
// 	});
// });

// chrome.tabs.onActivated.addListener(function (lala) {
// 	console.log(111111222222333333333333, lala);
// 	chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
// 		console.log(tabs);
// 	});
// });

// chrome.tabs.onCreated.addListener(function (tab) {
// 	console.log(111222, tab);
// 	chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
// 		console.log(tabs);
// 	});
// });

// chrome.action.onClicked.addListener(async (tab) => {
// 	if (tab.url.includes(extensions)) {
// 		console.log(1111122222233333);
// 		// Retrieve the action badge to check if the extension is 'ON' or 'OFF'
// 		const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
// 		// Next state will always be the opposite
// 		const nextState = prevState === 'ON' ? 'OFF' : 'ON';

// 		// Set the action badge to the next state
// 		await chrome.action.setBadgeText({
// 			tabId: tab.id,
// 			text: nextState,
// 		});

// 		if (nextState === 'ON') {
// 			// Insert the CSS file when the user turns the extension on
// 			await chrome.scripting.executeScript({
// 				files: ['content.js'],
// 				target: { tabId: tab.id },
// 			});
// 		} else if (nextState === 'OFF') {
// 			// Remove the CSS file when the user turns the extension off
// 			await chrome.scripting.unregisterContentScripts({});
// 		}
// 	}
// });

// Path: background.js
chrome.action.onClicked.addListener(async (tab) => {
	if (tab.url?.includes(extensions)) {
		// Retrieve the action badge to check if the extension is 'ON' or 'OFF'
		const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
		// Next state will always be the opposite
		const nextState = prevState === 'ON' ? 'OFF' : 'ON';

		// Set the action badge to the next state
		await chrome.action.setBadgeText({
			tabId: tab.id,
			text: nextState,
		});

		if (nextState === 'ON') {
			// Insert the CSS file when the user turns the extension on
			await chrome.scripting.executeScript({
				files: ['content.js'],
				target: { tabId: tab.id ? tab.id : 0 },
			});

			// Send a message to the content script to show the modal
			chrome.tabs.sendMessage(tab.id ? tab.id : 0, { message: 'show_modal' });
		} else if (nextState === 'OFF') {
			// Remove the CSS file when the user turns the extension off
			chrome.tabs.sendMessage(tab.id ? tab.id : 0, { message: 'hide_modal' });
			await chrome.scripting.unregisterContentScripts({});
		}
	}
});

export {};
