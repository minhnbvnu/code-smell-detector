function tryToCreate(dir, key) {
  try {
    mkdirp.sync(dir);
    fs.accessSync(dir);
  } catch(e) {
    throw new Error("Could not create/access settings." + key + " at " + dir + "");
  }
}