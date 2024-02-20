function MatchPattern(pattern) {
  this._pattern = pattern;

  // Special case "<all_urls>".
  if (pattern == "<all_urls>") {
    this._all = true;
    this._protocol = "all_urls";
    return;
  } else {
    this._all = false;
  }

  let m = pattern.match(REG_PARTS);
  if (!m) {
    throw new Error("@match: Could not parse the pattern: " + pattern);
  }
  const protocol = m[1];
  this._protocol = protocol;
  let host = m[2];
  const path = m[3];

  if (protocol != "*:" && validProtocols.indexOf(protocol) == -1) {
    throw new Error(`@match: Invalid protocol (${protocol}) specified.`);
  }

  if (!host && protocol != "file:") {
    throw new Error(`@match: No host specified for (${protocol}).`)
  } else if (host && protocol == "file:") {
    throw new Error("@match: Invalid (file:) URI, missing prefix \"/\"?");
  }

  if (!REG_HOST.test(host)) {
    throw new Error("@match: Invalid host specified.");
  }

  if (path[0] !== "/") {
    throw new Error("@match: Invalid path specified.");
  }

  if (host) {
    // We have to manually create the hostname regexp (instead of using
    // GM_convert2RegExp) to properly handle *.example.tld, which should match
    // example.tld and any of its subdomains, but not anotherexample.tld.
    this._hostExpr = new RegExp("^" +
        // Two characters in the host portion need special treatment:
        //   - "." should not be treated as a wildcard, so we escape it to \.
        //   - if the hostname only consists of "*" (i.e. full wildcard),
        //     replace it with .*
        host.replace(/\./g, "\\.").replace(/^\*$/, ".*")
        // Then, handle the special case of "*." (any or no subdomain) for match
        // patterns. "*." has been escaped to "*\." by the replace above.
            .replace("*\\.", "(.*\\.)?") + "$", "i");
  } else {
    // If omitted, then it means "", used for file: protocol only
    this._hostExpr = /^$/;
  }
  this._pathExpr = GM_convert2RegExp(path, false, true);
}