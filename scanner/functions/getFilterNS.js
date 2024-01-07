function getFilterNS(version) {
  let ns;
  if (version === '2.0.0') {
    ns = FESNS[version];
  } else {
    ns = OGCNS[version];
  }
  return ns;
}