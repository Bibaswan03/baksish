const CryptoJS = require("crypto-js");

const secret = "bhgfrtfgyhjxa";

export const encrypt = (text) => {
  // Encrypt the text
  const ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
  // Encode the ciphertext using Base64
  const encodedCiphertext = Buffer.from(ciphertext).toString('base64');
  return encodedCiphertext;
};

export const decrypt = (encodedCiphertext) => {
  // Decode the Base64 encoded ciphertext
  const ciphertext = Buffer.from(encodedCiphertext, 'base64').toString('ascii');
  // Decrypt the ciphertext
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  // Convert decrypted bytes to Utf8 string
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
