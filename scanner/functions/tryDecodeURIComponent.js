function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    // Ignore any invalid uri component
  }
}