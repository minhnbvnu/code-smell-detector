function mkdirSyncGuard(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target);
    // eslint-disable-next-line no-inner-declarations
    function mkdirp(dir) {
      if (fs.existsSync(dir)) {
        return true;
      }
      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}