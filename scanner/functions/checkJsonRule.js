async function checkJsonRule(codeDir, rule) {
  const p = path.join(codeDir, resolvePath(rule.path));
  const jsonKey = rule.jsonKey;
  const jsonValueContains = rule.jsonValueContains;

  const { success, json } = await readJsonFile(p);
  if (!success) { return success; }
  if (!_.has(json, jsonKey)) { return false; }

  const value = _.get(json, jsonKey);
  if (jsonValueContains !== undefined && jsonValueContains !== null) {
    return _.includes(value, jsonValueContains);
  }
  return true;
}