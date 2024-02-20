function getHostCachePathComponent(url) {
    const {
        host
    } = new URL(url);

    return host.replace(/\.:/gi, '_').replace(/[^a-z0-9_]/gi, '_').toLowerCase()
      + '_' + SHA1(host);
}