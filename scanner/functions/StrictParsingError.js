function StrictParsingError(message) {
  HttpSignatureError.call(this, message, StrictParsingError);
}