function deleteJSONKeys(keysObj, to) {
  const obj = JSON.parse(fs.readFileSync(to, { encoding: 'utf8' }));
  deleteKeys(obj, keysObj);
  fs.writeFileSync(to, JSON.stringify(obj, null, '  '), { encoding: 'utf8' });
}