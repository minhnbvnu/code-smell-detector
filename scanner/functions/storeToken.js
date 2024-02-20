function storeToken(options, token) {
  __authToken = token;
  if (typeof options === 'object' && options.remember) {
    TokenContext.store();
  } else {
    TempTokenContext.store();
  }
}