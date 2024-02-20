async function chromiumEdgeBundleAvailable(opts) {
  const url = util.format(
    urls.chromiumedge,
    opts.drivers.chromiumedge.baseURL,
    opts.drivers.chromiumedge.version,
    getChromiumEdgeDriverArchitectureOld(opts.drivers.chromiumedge.platform, opts.drivers.chromiumedge.version)
  );
  try {
    await got.head(url, { timeout: 10000 });
  } catch (_) {
    return false;
  }
  return true;
}