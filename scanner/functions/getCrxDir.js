function getCrxDir(id) {
  id = id || '';
  return path.join(app.getPath('userData'), 'crx', id);
}