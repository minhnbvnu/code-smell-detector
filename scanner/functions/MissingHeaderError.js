function MissingHeaderError(message) {
  HttpSignatureError.call(this, message, MissingHeaderError);
}