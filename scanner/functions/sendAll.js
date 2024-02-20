function sendAll() {
    if (!buf.length) return;
    output.write(JSON.parse(buf));
  }