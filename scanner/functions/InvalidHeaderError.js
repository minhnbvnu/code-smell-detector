function InvalidHeaderError(message) {
  HttpSignatureError.call(this, message, InvalidHeaderError);
}