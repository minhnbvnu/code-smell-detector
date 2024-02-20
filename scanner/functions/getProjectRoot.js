function getProjectRoot(file) {
  let currdir = dirname(file);
  while (true) {
    const up = resolve(currdir, "..");
    if (up === currdir) {
      return "";
    }
    if (existsSync(join(up, "clio.toml"))) {
      return up;
    }
    currdir = up;
  }
}