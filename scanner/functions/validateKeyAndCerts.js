function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
  let encrypted;
  try {
    // publicEncrypt will throw an error with an invalid cert
    encrypted = crypto.publicEncrypt(cert, Buffer.from('test'));
  } catch (err) {
    throw new Error(
      `The certificate "${chalk.yellow(crtFile)}" is invalid.\n${err.message}`
    );
  }

  try {
    // privateDecrypt will throw an error with an invalid key
    crypto.privateDecrypt(key, encrypted);
  } catch (err) {
    throw new Error(
      `The certificate key "${chalk.yellow(keyFile)}" is invalid.\n${
        err.message
      }`
    );
  }
}