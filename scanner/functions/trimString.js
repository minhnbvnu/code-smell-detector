function trimString(string, length) {
  if (string.length > length) {
    return `${string.substr(0, length - 1)}…`;
  }

  return string;
}