function isText(message) {
  return Object.keys(message).length === 1 && Object.keys(message).includes('text');
}