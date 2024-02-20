function formatClassType(data, type) {
  if (typeof(data) === 'undefined') {
    return undefined;
  }

  if (data instanceof type) {
    return data;
  }
  return new type(data);
}