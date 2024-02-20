function insertText2File(text, filepath, line = -1) {
  const lines = fs.existsSync(filepath)
    ? fs.readFileSync(filepath, { encoding: 'utf8' }).split('\n')
    : [];

  if (line === -1) {
    lines.push(text);
  } else {
    lines.splice(line, 0, text);
  }

  const parentPath = path.dirname(filepath);

  if (!fs.existsSync(parentPath)) {
    mkdirSyncGuard(parentPath);
  }

  fs.writeFileSync(filepath, lines.join('\n'), {
    encoding: 'utf8',
  });
}