import CryptoJS from 'crypto-js';

const encryptData = (data) => {
	const dataString = typeof data === 'string' ? data : JSON.stringify(data);
	const encryptedData = CryptoJS.AES.encrypt(
		dataString,
		'5H*Rm7$%hfalesdr4eiwo654@5@Egv35d4f$$2123989822487jsadhf@!87'
	).toString();
	return encryptedData;
};

export default encryptData;
