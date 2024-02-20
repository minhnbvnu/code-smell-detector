function __parseCookiesRequest(str) {
  const cookies = {};
  const cookiesArray = (str || '')
    .split(';')
    .map(cookie => cookie.trim())
    .filter(cookie => !!cookie);
  for (const cookie of cookiesArray) {
    const { name, value } = __splitCookie(cookie);
    cookies[name] = value;
  }
  return cookies;
}