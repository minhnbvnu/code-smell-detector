function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}