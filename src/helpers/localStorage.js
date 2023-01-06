import decryptData from './decryptData';
import encryptData from './encryptData';

const setData = async (key, data) => {
	const encryptedData = encryptData(data);

	const response = await chrome.storage.local.set({
		[key]: encryptedData,
	});

	return response;
};

const getData = async (key) => {
	const response = await chrome.storage.local.get([key]);
	const decryptedData = decryptData(response[key]);
	return JSON.parse(decryptedData);
};

export { setData, getData };
