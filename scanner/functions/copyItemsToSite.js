function copyItemsToSite(dataDir) {
    const items = analysis.readJSON(`${dataDir}/latest-canonical.json.${analysis.FILE_COMPRESSOR}`).filter((item) => item.name);
    analysis.writeJSON(`site/output/data/latest-canonical.json`, items);
    for (const store of analysis.STORE_KEYS) {
        const storeItems = items.filter((item) => item.store === store);
        analysis.writeJSON(`site/output/data/latest-canonical.${store}.compressed.json`, storeItems, false, 0, true);
    }
    const csvItems = csv.itemsToCSV(items);
    fs.writeFileSync("site/output/data/latest-canonical.csv", csvItems, "utf-8");
    console.log("Copied latest items to site.");
}