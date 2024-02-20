async function prepareDemo() {
  const code = {};
  for (let i = 0, len = CryptoFiles.length; i < len; i++) {
    const file = CryptoFiles[i];
    const full = require.resolve(file);
    code[file] = await fs.readFile(full, 'utf8');
  }
  for (let i = 0, len = CmFiles.length; i < len; i++) {
    const file = CmFiles[i];
    const full = require.resolve(file);
    code[file] = await fs.readFile(full, 'utf8');
  }

  const result = UglifyJS.minify(code);
  await fs.writeFile(path.join('demo', 'vendor.js'), result.code, 'utf8');
}