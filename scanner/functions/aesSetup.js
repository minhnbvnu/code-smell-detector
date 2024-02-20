function aesSetup() {
  var aesWarn = {
    type : 'confirm',
    name : 'aesContinue',
    message :
      (sparseConfig.k['1']
        ? "WARNING: Sparse Config contains an AES key override."
        : "WARNING: Generating new AES key at version 1.")
      + " Any currently encrypted data may be invalidated. 'no' will give you the opportunity to patch any current keys; Continue?"

  }

  // throw warning that this step will invalidate any existing encrypted data
  prompt(aesWarn, function(answer) {
    if (!answer.aesContinue) {
      console.log('Aborted');
      process.exit(0);
    } else {
      if (sparseConfig.k['1']) {
        sslSetup();
      } else {
        crypto.randomBytes(16, function(ex, buf) {
          var token = buf.toString('hex');
          sparseConfig.k['1'] = token;
          sslSetup();
        });
      }
    }
  });
}