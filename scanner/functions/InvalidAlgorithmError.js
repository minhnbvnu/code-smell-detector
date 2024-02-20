function InvalidAlgorithmError(message) {
  HttpSignatureError.call(this, message, InvalidAlgorithmError);
}