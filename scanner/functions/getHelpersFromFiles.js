async function getHelpersFromFiles() {
  const files = (await readdir(helpersDir)).filter(name =>
    name.endsWith('.json')
  );
  const texts = await Promise.all(
    files.map(name => readFile(path.join(helpersDir, name)))
  );
  const helpers = texts.map(text => JSON.parse(text));
  return Object.fromEntries(helpers.map(h => [h.name, h]));
}