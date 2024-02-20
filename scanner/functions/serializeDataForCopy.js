function serializeDataForCopy(props) {
  const cloned = Object.assign({}, props);
  sanitize(cloned);

  try {
    return JSON.stringify(cloned, null, 2);
  } catch (error) {
    return '';
  }
}