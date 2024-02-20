function getLatestInstalledCrx(id, purge) {
  var dir = getCrxDir(id);
  if (!fs.existsSync(dir))
    return null;
  var crxs = fs.readdirSync(dir)
  .filter(s => s.endsWith('.crx') && s.startsWith('app-'))
  .sort(function(dir1, dir2) {
    dir1 = dir1.replace('app-', '').replace('.crx', '');
    dir2 = dir2.replace('app-', '').replace('.crx', '');
    return compareChromeVersions(dir1, dir2);
  });
  if (!crxs.length)
    return null;
  var ret = crxs.pop();
  if (purge) {
    var clear = fs.readdirSync(dir)
    .filter(s => s.indexOf(ret) == -1);
    clear.forEach(function(extra, index) {
      console.log(`deleting ${extra}`);
      var del = path.join(dir, extra);
      deleteRecursive(del);
      try {
        // if the old path can't be deleted for whatever reason (running binary),
        // just rename it so the directory can be used.
        // there was a bug in vysor where reset + upgrade failed because
        // an adb binary was sticking around daemonized.
        var random = Math.round(Math.random() * (1 << 30)).toString(16);
        fs.renameSync(del, path.join(dir, 'failed-delete-' + random));
      }
      catch (ignored) {
      }
    });
  }
  return path.join(dir, ret);
}