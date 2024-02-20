function hideMapboxWarning() {
  const missingTokenWarning = document.getElementById('no-token-warning');
  if (missingTokenWarning) {
    missingTokenWarning.style.display = 'none';
  }
}