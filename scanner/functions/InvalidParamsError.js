function InvalidParamsError(message) {
  HttpSignatureError.call(this, message, InvalidParamsError);
}