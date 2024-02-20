function convertURIBase(uri, fromBase, toBase) {
    fromBase = normalizeURI(fromBase);
    toBase = normalizeURI(toBase);
    if (uri.match(absUrlRegEx) || uri.match(protocolRegEx))
      return uri;
    uri = normalizeURI(uri);
    // if toBase specifies a protocol path, ensure this is the same protocol as fromBase, if not
    // use absolute path at fromBase
    var toBaseProtocol = toBase.match(protocolRegEx);
    var fromBaseProtocol = fromBase.match(protocolRegEx);
    if (fromBaseProtocol && (!toBaseProtocol || toBaseProtocol[1] != fromBaseProtocol[1] || toBaseProtocol[2] != fromBaseProtocol[2]))
      return absoluteURI(uri, fromBase);
    
    else {
      return relativeURI(absoluteURI(uri, fromBase), toBase);
    }
  }