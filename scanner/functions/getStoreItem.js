function getStoreItem(key) {
  let value = localStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {
    // do nothing
  }

  return value;
}