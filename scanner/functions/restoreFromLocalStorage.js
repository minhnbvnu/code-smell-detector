function restoreFromLocalStorage() {
  const str = localStorage.getItem('completedHashes');
  if (str) {
    const completedHashes = new Set(JSON.parse(str));
    return completedHashes;
  }
  return new Set();
}