function isSameDomain(requestUrl, locationUrl) {
  var match = IS_SAME_DOMAIN_URL_MATCH.exec(requestUrl);
  // if requestUrl is relative, the regex does not match.
  if (match == null) return true;

  var domain1 = {
      protocol: match[2],
      host: match[4],
      port: int(match[6]) || DEFAULT_PORTS[match[2]] || null,
      // IE8 sets unmatched groups to '' instead of undefined.
      relativeProtocol: match[2] === undefined || match[2] === ''
    };

  match = SERVER_MATCH.exec(locationUrl);
  var domain2 = {
      protocol: match[1],
      host: match[3],
      port: int(match[5]) || DEFAULT_PORTS[match[1]] || null
    };

  return (domain1.protocol == domain2.protocol || domain1.relativeProtocol) &&
         domain1.host == domain2.host &&
         (domain1.port == domain2.port || (domain1.relativeProtocol &&
             domain2.port == DEFAULT_PORTS[domain2.protocol]));
}