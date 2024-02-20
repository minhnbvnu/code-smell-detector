async function readJsonFile(p) {
  if (!await fs.pathExists(p)) { return { success: false }; }

  try {
    const content = await fs.readFile(p);
    const json = JSON.parse(content.toString());
    return { success: true, json };
  } catch (e) {
    debug('readJsonFile error', e);
    return { success: false };
  }
}