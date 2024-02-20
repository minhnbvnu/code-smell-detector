function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}