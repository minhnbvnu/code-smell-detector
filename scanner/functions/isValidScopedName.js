function isValidScopedName(name) {
  if (name[0] !== '@') {
    return false;
  }

  const parts = name.slice(1).split('/');
  return parts.length === 2 && isValidName(parts[0]) && isValidName(parts[1]);
}