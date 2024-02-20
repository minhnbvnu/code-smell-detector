async function updateSnapsRegistryList() {
  const resp = await needle(ENDPOINTS.SNAPS_REGISTRY_LIST, {
    headers: {
      user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) EthPhishingDetect/1.2.0 Safari/537.36',
    },
  });

  const snapsRegistryJson = resp.body;
  
  function extractHostname(snap, path) {
    const url = path.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, snap);
    return url ? new URL(url).hostname.replace('www.', '') : null;
  }
  
  const websites = Object.values(snapsRegistryJson.verifiedSnaps).reduce((acc, snap) => {
    const website = extractHostname(snap, ['metadata', 'website']);
    const authorWebsite = extractHostname(snap, ['metadata', 'author', 'website']);
  
    if (website) acc.push(website);
    if (authorWebsite) acc.push(authorWebsite);
  
    return acc;
  }, []);

  const uniqWebsites = [...new Set(websites)];

  try {
    fs.writeFileSync(DB_PATH + "/snapsregistry.txt", uniqWebsites.join("\n"));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}