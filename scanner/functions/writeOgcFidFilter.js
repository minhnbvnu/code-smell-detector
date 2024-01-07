function writeOgcFidFilter(node, fid, objectStack) {
  const context = objectStack[objectStack.length - 1];
  const version = context['version'];
  const ns = OGCNS[version];
  const filter = createElementNS(ns, 'Filter');
  const child = createElementNS(ns, 'FeatureId');
  filter.appendChild(child);
  child.setAttribute('fid', /** @type {string} */ (fid));
  node.appendChild(filter);
}