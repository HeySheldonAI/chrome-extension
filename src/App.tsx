chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('request', request);

	sendResponse({ message: 'modal_removed' });
});

function App() {
	console.log('Hello');

	return (
		<div className="App">
			<header className="App-header">Hello</header>
		</div>
	);
}

export default App;
