async function write(info) {
  await fse.outputJson(infoPath, info, {spaces: 2});
}