function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString();
  } else {
    /* c8 ignore next 2 */
    return window.atob(str);
  }
}