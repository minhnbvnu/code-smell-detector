function getLastPartOfKey(key, ancestorKey) {
  let lastPart = '';
  const startString = `${ancestorKey}.`;
  if (key.indexOf(startString) === 0) {
    lastPart = key.replace(startString, '');
    if (lastPart.startsWith('$.')) lastPart = lastPart.slice(2);
  }
  return lastPart;
}