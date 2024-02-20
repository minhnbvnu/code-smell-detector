function createBrowserSafeString(toBeConverted) {
  const convertedString = toBeConverted.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return convertedString;
}