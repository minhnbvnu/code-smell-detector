function createFobidList(dir) {
  const forbid = [];
  try {
    fs.readdirSync(path.join(__dirname, dir)).forEach(p => {
      if (p.startsWith('fb-')) {
        forbid.push(p);
      }
    });
  } catch (e) {
    // This lint rules also runs in the atom-ide-ui repository, which doesn't have a pkg/ folder at the root.
  }

  return forbid;
}