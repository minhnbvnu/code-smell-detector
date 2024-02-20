function __parseCookiesResponse(cookiesArray) {
  const cookies = {};
  for (const cookie of cookiesArray) {
    const { name, value } = __splitCookie(cookie.split(';')[0]);
    cookies[name] = value;
  }
  return cookies;
}