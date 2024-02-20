function mergeObj2JSON(object, to) {
  const json = JSON.parse(fs.readFileSync(to, { encoding: 'utf8' }));

  extendDeep(json, object);

  fs.writeFileSync(to, JSON.stringify(json, null, '  '), { encoding: 'utf8' });
}