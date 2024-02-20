function maybeSync(localPath, name, rest) {
  let stats;
  try {
    stats = fs.statSync(localPath);
  } catch (e) {
    return;
  }

  if (!stats.isFile(localPath)) {
    return;
  }
  const source = fs.realpathSync(path.join(jlab.linkedPackages[name], rest));
  if (source === fs.realpathSync(localPath)) {
    return;
  }
  fs.watchFile(source, { interval: 500 }, function (curr) {
    if (!curr || curr.nlink === 0) {
      return;
    }
    try {
      fs.copySync(source, localPath);
    } catch (err) {
      console.error(err);
    }
  });
}