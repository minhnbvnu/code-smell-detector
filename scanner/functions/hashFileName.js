function hashFileName (path) {
  const hash = crypto
            .createHash('sha256')
            .update(fs.readFileSync(path))
            .digest('hex');

  return path.replace(/\.([^.]*?)$/, `.${hash}.$1`);
}