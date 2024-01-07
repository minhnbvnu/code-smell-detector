function typeName(type) {
  const names = [];
  for (const namedType of namedTypes) {
    if (includesType(type, namedType)) {
      names.push(typeNames[namedType]);
    }
  }
  if (names.length === 0) {
    return 'untyped';
  }
  if (names.length < 3) {
    return names.join(' or ');
  }
  return names.slice(0, -1).join(', ') + ', or ' + names[names.length - 1];
}