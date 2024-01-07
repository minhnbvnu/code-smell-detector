function getUserEncryptionKeyR5(
  processedUserPassword,
  userKeySalt,
  encryptionKey
) {
  const key = CryptoJS.SHA256(
    processedUserPassword.clone().concat(userKeySalt)
  );
  const options = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
    iv: CryptoJS.lib.WordArray.create(null, 16)
  };
  return CryptoJS.AES.encrypt(encryptionKey, key, options).ciphertext;
}