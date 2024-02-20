function formatTimeCode(value, format = '{hh}:{mm}:{ss}.{SSS}') {
  const formatters = {
    h: (format.match(/\{(h+)\}/) || [])[1],
    m: (format.match(/\{(m+)\}/) || [])[1],
    s: (format.match(/\{(s+)\}/) || [])[1],
    S: (format.match(/\{(S+)\}/) || [])[1]
  };

  const parts = {
    h: x => Math.floor(x / 3600),
    m: x => Math.floor(x / 60) % 60,
    s: x => Math.floor(x % 60),
    S: (x, len) => Math.floor((x % 1) * Math.pow(10, len))
  };

  let result = format;
  for (const key in parts) {
    const f = formatters[key] || '';
    if (f) {
      const digits = f.length;
      result = result.replace(`{${f}}`, String(parts[key](value, digits)).padStart(digits, '0'));
    }
  }
  return result;
}