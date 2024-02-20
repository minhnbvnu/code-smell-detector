function loadRcFile(fileText, filePath) {
  var _parse = (0, (_lockfile || _load_lockfile()).parse)(fileText, 'yarnrc');

  let values = _parse.object;


  if (filePath.match(/\.yml$/)) {
    values = { 'yarn-path': values.yarnPath };
  }

  // some keys reference directories so keep their relativity
  for (const key in values) {
    if (PATH_KEYS.has(key.replace(/^(--)?([^.]+\.)*/, ''))) {
      values[key] = (0, (_path || _load_path()).resolve)((0, (_path || _load_path()).dirname)(filePath), values[key]);
    }
  }

  return values;
}