function shouldReturn304(req, serverLastModified, serverEtag) {
    if (!req || !req.headers) {
      return false;
    }

    const clientModifiedSince = req.headers['if-modified-since'];
    const clientEtag = req.headers['if-none-match'];
    let clientModifiedDate;

    if (!clientModifiedSince && !clientEtag) {
      // Client did not provide any conditional caching headers
      return false;
    }

    if (clientModifiedSince) {
      // Catch "illegal access" dates that will crash v8
      // https://github.com/jfhbrook/node-ecstatic/pull/179
      try {
        clientModifiedDate = new Date(Date.parse(clientModifiedSince));
      } catch (err) {
        return false;
      }

      if (clientModifiedDate.toString() === 'Invalid Date') {
        return false;
      }
      // If the client's copy is older than the server's, don't return 304
      if (clientModifiedDate < new Date(serverLastModified)) {
        return false;
      }
    }

    if (clientEtag) {
      // Do a strong or weak etag comparison based on setting
      // https://www.ietf.org/rfc/rfc2616.txt Section 13.3.3
      if (opts.weakCompare && clientEtag !== serverEtag
        && clientEtag !== `W/${serverEtag}` && `W/${clientEtag}` !== serverEtag) {
        return false;
      }
      if (!opts.weakCompare && (clientEtag !== serverEtag || clientEtag.indexOf('W/') === 0)) {
        return false;
      }
    }

    return true;
  }