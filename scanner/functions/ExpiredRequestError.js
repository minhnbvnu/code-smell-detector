function ExpiredRequestError(message) {
  HttpSignatureError.call(this, message, ExpiredRequestError);
}