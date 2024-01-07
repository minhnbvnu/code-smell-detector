function getOwnerPasswordR5(
  processedOwnerPassword,
  userPasswordEntry,
  generateRandomWordArray
) {
  const validationSalt = generateRandomWordArray(8);
  const keySalt = generateRandomWordArray(8);
  return CryptoJS.SHA256(
    processedOwnerPassword
      .clone()
      .concat(validationSalt)
      .concat(userPasswordEntry)
  )
    .concat(validationSalt)
    .concat(keySalt);
}