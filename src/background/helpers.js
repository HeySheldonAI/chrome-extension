/* eslint-disable no-undef */

// function to check if the cookies exist and are valid.
// returns an object with the key payload : { isLoggedIn: true/false }
const checkLogin = () => {
	chrome.cookies.getAll({}, (cookies) => {
		
	});
};

export default checkLogin;
