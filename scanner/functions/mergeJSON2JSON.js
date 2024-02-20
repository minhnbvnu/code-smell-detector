function mergeJSON2JSON(from, to) {
  const json = JSON.parse(fs.readFileSync(from, { encoding: 'utf8' }));

  mergeObj2JSON(json, to);
}