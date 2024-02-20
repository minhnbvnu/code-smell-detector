async function SQLite(require) {
  const [init, dist] = await Promise.all([require(sql.resolve()), require.resolve(sql.resolve("dist/"))]);
  return init({locateFile: file => `${dist}${file}`});
}