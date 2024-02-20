function GM_convert2RegExp(pattern, uri, forceGlob) {
  const s = String(pattern);

  if (!forceGlob && '/' == s.substr(0, 1) && '/' == s.substr(-1, 1)) {
    // Leading and trailing slash means raw regex.
    return new RegExp(s.substring(1, s.length - 1), 'i');
  }

  let res = "^";

  for (let i = 0 ; i < s.length ; i++) {
    switch(s[i]) {
      case "*" :
        res += ".*";
        break;

      case "." :
      case "?" :
      case "^" :
      case "$" :
      case "+" :
      case "{" :
      case "}" :
      case "[" :
      case "]" :
      case "|" :
      case "(" :
      case ")" :
      case "\\" :
        res += "\\" + s[i];
        break;

      case " " :
        // Remove spaces from URLs.
        break;

      default :
        res += s[i];
        break;
    }
  }


  // TODO: Accurate ".tld" support; blocked by http://bugzil.la/1315558
  res = res.replace(tldRegExp, '$1(.[a-z]{1,6}){1,3}$2');

  return new RegExp(res + "$", "i");
}