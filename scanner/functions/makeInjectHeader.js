function makeInjectHeader(name, value) {
  return function(details) {
    injectHeader(
      name,
      value,
      details.requestHeaders
    );
    return {requestHeaders: details.requestHeaders};
  };
}