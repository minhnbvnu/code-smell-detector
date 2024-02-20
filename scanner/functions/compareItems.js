function compareItems(refItems, items) {
    const changes = [];
    const lookup = {};
    for (let refItem of refItems) lookup[refItem.store + refItem.id] = refItem;

    for (let item of items) {
        const refItem = lookup[item.store + item.id] ?? {};
        const itemChanges = {};
        for (let key of Object.keys(item)) {
            const ref = (refItem[key] ?? "").toString();
            const now = (item[key] ?? "").toString();
            // second checks remove comparison artifacts for invalid prices
            if (now !== ref && !(now == "NaN" && ref == "")) {
                itemChanges[key] = "" + ref + " -> " + now;
            }
        }

        if (Object.keys(itemChanges).length) {
            itemChanges.name = itemChanges.name ?? refItem.name;
            itemChanges.store = itemChanges.store ?? refItem.store;
            changes.push(itemChanges);
        }
    }
    console.log(`Compared with reference file: ${changes.length} items changed`);
    return changes;
}