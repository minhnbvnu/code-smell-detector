function readTmpl(from, data = {}) {
  const text = fs.readFileSync(from, { encoding: 'utf8' });
  return template(text, data);
}