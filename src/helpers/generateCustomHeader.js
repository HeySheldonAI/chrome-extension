// function to generate custom header for testing in the localhost

import encryptData from "./encryptData";

const generateCustomHeader = () => {
	const origin = 'sheldon_extension';
	const timestamp = new Date().getTime();
	const randomString =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);

	const headerString = `${origin}::${timestamp}::${randomString}`;
	return encryptData(headerString);
};

export default generateCustomHeader;