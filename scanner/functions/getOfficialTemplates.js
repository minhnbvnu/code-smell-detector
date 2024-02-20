function getOfficialTemplates() {
  debug('get official template list...');
  const content = fs.readFileSync(path.join(__dirname, 'templates.json'), 'utf8');
  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error(`Unable to parse JSON file from ./templates.json. Error: ${err}`);
  }
}