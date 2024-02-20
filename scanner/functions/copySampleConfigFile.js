function copySampleConfigFile() {
  const moduleSystem = global.options.module === 'esm' ? 'esm' : 'commonjs';
  const source = path.join(__dirname, `../../samples/${moduleSystem}/migrate-mongo-config.js`);
  const destination = path.join(
    process.cwd(),
    config.DEFAULT_CONFIG_FILE_NAME
  );
  return fs.copy(source, destination);
}