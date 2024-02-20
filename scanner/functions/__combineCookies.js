function __combineCookies(cookies) {
  const cookiesArray = [];
  for (const name in cookies) {
    cookiesArray.push(`${name}=${cookies[name]}`);
  }
  return cookiesArray.join('; ');
}