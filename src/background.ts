chrome.action.onClicked.addListener(async (tab) => {
	chrome.tabs.sendMessage(tab.id ? tab.id : 0, {
		action: 'sheldon_toggle_search_prompt',
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'sheldon_login') {
		// chrome.identity
		// 	.getAuthToken({ interactive: true })
		// 	.then((data) => {
		// 		fetch(
		// 			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.token}`
		// 		)
		// 			.then((response) => response.json())
		// 			.then((userData) => {
		// 				sendResponse({ token: data.token, userData });
		// 			})
		// 			.catch((error) => {
		// 				console.log(error);
		// 			});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		chrome.cookies.getAll({}, (cookies) => {
			console.log(cookies);
		});

		return true;
	}
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	if (request.action === 'sheldon_login') {
// 		const redirectURL = 'chrome-extension://jjpcchlkabbeeghocolljenmdeeckkoi';
// 		const clientID =
// 			'379131991034-vmdhks21u4nbobccqmnqdoem8rj23juc.apps.googleusercontent.com';
// 		const scopes = ['openid', 'email', 'profile'];
// 		let authURL = 'https://accounts.google.com/o/oauth2/auth';
// 		authURL += `?client_id=${clientID}`;
// 		authURL += `&response_type=token`;
// 		authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
// 		authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

// 		console.log(authURL);
// 		chrome.identity.launchWebAuthFlow(
// 			{
// 				url: authURL,
// 				interactive: true,
// 			},
// 			function (responseUrl) {
// 				console.log(responseUrl);
// 			}
// 		);

// 		return true;
// 	}
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'sheldon_logout') {
		console.log(request);
		chrome.identity.clearAllCachedAuthTokens(() => {
			sendResponse({ success: true });
		});

		return true;
	}
});

// https://accounts.google.com/o/oauth2/auth?client_id=379131991034-vmdhks21u4nbobccqmnqdoem8rj23juc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fjjpcchlkabbeeghocolljenmdeeckkoi.chromiumapp.org%2F&response_type=token&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email

export {};
