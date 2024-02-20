async function getTpl(...tplPaths) {
  const tpl = mergeTpl(...tplPaths);
  debug('exist tpl: %j', tpl);
  return tpl;
}