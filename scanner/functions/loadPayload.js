function loadPayload(p) {
  let body;
  switch (typeof p) {
    case 'object':
      body = p;
      break;
    case 'string':
      body = require(jsonPath(p));
  }
  return body;
}