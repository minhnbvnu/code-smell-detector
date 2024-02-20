function parseNasUri(nasUri) {
  const res = nasUri.match(NAS_URI_PATTERN);
  if (!res) {
    throw new Error(red(`invalid nas path : ${nasUri}`));
  }
  return {
    nasPath: res[PATH_NAME_REGEX_INDEX],
    serviceName: res[SERVICE_NAME_REGEX_INDEX]
  };
}