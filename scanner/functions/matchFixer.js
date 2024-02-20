async function matchFixer(href, { injectWebfix }) {
  if (!injectWebfix) {
    return null;
  }

  try {
    const userSites = await getWebfixRulesWithDefault();
    const subSites = await loadOrFetchWebfix(process.env.REACT_APP_WEBFIXURL);
    const sites = [...userSites, ...subSites];
    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];
      if (isMatch(href, site.pattern) && fixerMap[site.fixer]) {
        return site;
      }
    }
  } catch (err) {
    console.error(`[kiss-webfix match]: ${err.message}`);
  }

  return null;
}