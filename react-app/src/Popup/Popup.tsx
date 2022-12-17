import './Popup.scss';

const Popup = () => {
	return (
		<div>
			<h1>Popup</h1>
			<img src={chrome.runtime.getURL('images/Main.webp')} alt="Logo" />
		</div>
	);
};

export default Popup;
