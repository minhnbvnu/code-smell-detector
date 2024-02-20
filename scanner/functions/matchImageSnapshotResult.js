function matchImageSnapshotResult() {
  return () => {
    snapshotRunning = false;

    const { pass, added, updated } = snapshotResult;

    // @todo is there a less expensive way to share state between test and reporter?
    if (!pass && !added && !updated && fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      cache.push(snapshotResult);
      fs.writeFileSync(cachePath, JSON.stringify(cache), 'utf8');
    }

    return snapshotResult;
  };
}