function getParentProjectRoot(file) {
  let currdir = dirname(file);
  let lastProjectDir = "";
  while (true) {
    const up = resolve(currdir, "..");
    if (up === currdir) {
      return lastProjectDir;
    }
    if (existsSync(join(up, "clio.toml"))) {
      lastProjectDir = up;
    }
    currdir = up;
  }
}