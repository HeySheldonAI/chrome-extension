import CryptoJS from 'crypto-js';

const decryptData = (data: string) => {
	const decryptedData = CryptoJS.AES.decrypt(
		data,
		'5H*Rm7$%hfalesdr4eiwo654@5@Egv35d4f$$2123989822487jsadhf@!87'
	).toString(CryptoJS.enc.Utf8);
	return decryptedData;
};

export default decryptData;
