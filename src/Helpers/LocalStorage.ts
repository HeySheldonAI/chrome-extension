import decryptData from './DecryptData';
import encryptData from './EncryptData';

const setData = async (key: string, data: any) => {
	const encryptedData = encryptData(data);

	const response = await chrome.storage.local.set({
		[key]: encryptedData,
	});

	return response;
};

const getData = async (key: string) => {
	const response = await chrome.storage.local.get([key]);
	const decryptedData = decryptData(response[key]);
	return JSON.parse(decryptedData);
};

export { setData, getData };
