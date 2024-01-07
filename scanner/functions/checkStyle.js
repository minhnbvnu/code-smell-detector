function checkStyle(style) {
  if (!style) {
    return "";
  }

  return style.trim().split(/\s*;\s*/).filter(s => !!s).map(s => s.split(/\s*:\s*/, 2)).filter(([key]) => VALID_STYLES.has(key)).map(kv => kv.join(":")).join(";");
}