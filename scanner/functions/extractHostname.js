function extractHostname(snap, path) {
    const url = path.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, snap);
    return url ? new URL(url).hostname.replace('www.', '') : null;
  }