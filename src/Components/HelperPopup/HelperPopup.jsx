import './helperPopup.scss';

const HelperPopup = ({ toggleHelperPrompt, toggleSearchPrompt }) => {
	const handleOpen = () => {
		toggleHelperPrompt(false);
		toggleSearchPrompt(true);
	};

	const handleClose = () => {
		toggleHelperPrompt(false);
	};

	return (
		<div className="popup__container">
			<div
				className="popup__close_container"
				onClick={handleClose}
				title="close"
			>
				<img
					src={chrome.runtime.getURL('assets/images/cross.svg')}
					alt="Close"
					className="popup__close_icon"
				/>
			</div>
			<div className="popup__main" onClick={handleOpen} title="Sheldon">
				<img
					src={chrome.runtime.getURL('assets/images/main.webp')}
					alt="Ask Sheldon"
					className="popup__main_icon"
				/>
			</div>
		</div>
	);
};

export default HelperPopup;
