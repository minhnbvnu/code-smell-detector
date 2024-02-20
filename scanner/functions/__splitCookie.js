function __splitCookie(cookie) {
  const pos = cookie.indexOf('=');
  const name = cookie.substr(0, pos);
  const value = cookie.substr(pos + 1);
  return { name, value };
}