function unpackEnvelope(data) {
  const parts = data.type.split('/');
  return {
    namespace: parts[0],
    type: parts.slice(1).join('/'),
    data: data.data
  };
}