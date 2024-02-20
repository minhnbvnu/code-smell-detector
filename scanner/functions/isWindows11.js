function isWindows11(version) {
  const parts = version.split('.');
  if (parts.length > 2) {
    const major = parseInt(parts[0], 10);
    const minor = parseInt(parts[1], 10);
    const patch = parseInt(parts[2], 10);
    return major > 10 || (major === 10 && minor > 0) || (major === 10 && minor === 0 && patch >= 22000);
  }
  return false;
}