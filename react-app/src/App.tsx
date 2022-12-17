const App = () => {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		console.log(message);
	});

	return <></>;
};

export default App;
