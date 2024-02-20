function normalizeProtocolRelative(input, absoluteBase) {
    const { href, protocol } = new Url(input, absoluteBase);
    return href.slice(protocol.length);
  }