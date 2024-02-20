function setHeader(str) {
    const m = /^(.+?)\s*:\s*(.*)$/.exec(str);
    if (!m) {
      headers[str] = true;
    } else {
      headers[m[1]] = m[2];
    }
  }