function validateHeader(headerKey, headerValue) {

  if (!headerKey.trim() || !headerFieldRe.test(headerKey)) {
    return false;
  }

  if (typeof headerValue === 'string') {
    return headerFieldRe.test(headerValue);
  } else if (Array.isArray(headerValue)) {
    for (let value of headerValue) {
      if (!headerFieldRe.test(value)) { return false; }
    }
  } else { return false; }

  return true;
}