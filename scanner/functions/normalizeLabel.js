function normalizeLabel(label) {
  if (label == null) {
    return;
  }
  return process.platform === 'darwin' ? label : label.replace(/&/g, '');
}