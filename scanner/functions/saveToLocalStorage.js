function saveToLocalStorage(completedHashes) {
  const str = JSON.stringify([...completedHashes]);
  localStorage.setItem('completedHashes', str);
}