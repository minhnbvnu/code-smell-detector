function removePadding({ padding = {}, value = "" } = {}) {
  if (!padding.length || value.length >= padding.length) {
    return value;
  }

  let formatted = "";
  let useRemaining = false;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (useRemaining || i >= padding.length) {
      formatted += char;
    } else if (char !== padding.char) {
      formatted += char;
      useRemaining = true;
    }
  }

  return formatted;
}