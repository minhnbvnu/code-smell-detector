function escapeId(id) {
  return encodeURI(String(id)).replace(/;/g, '%3B');
}