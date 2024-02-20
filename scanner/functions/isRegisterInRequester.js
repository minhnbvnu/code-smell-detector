function isRegisterInRequester(obj) {
  return isSelfRegistry(obj) && obj.registerInRequestor;
}