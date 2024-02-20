function matchStyleProperty(key) {
  if (key === 'style') {
    return true;
  }

  if (key.slice(0, 6) === 'style.') {
    return key.slice(6);
  }

  return false;
}