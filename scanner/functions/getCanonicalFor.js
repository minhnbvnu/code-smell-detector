function getCanonicalFor(store, rawItems, today) {
    const canonicalItems = [];
    for (let i = 0; i < rawItems.length; i++) {
        let item = stores[store]?.getCanonical(rawItems[i], today);
        if (item) {
            item = {
                store,
                ...item,
            };
            for (const property of Object.keys(item)) {
                if (typeof item[property] === "string") {
                    item[property] = internString(item[property]);
                }
            }
            canonicalItems.push(item);
        }
    }
    return canonicalItems;
}