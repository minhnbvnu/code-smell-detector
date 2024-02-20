function mergePriceHistory(oldItems, items) {
    if (oldItems == null) return items;

    const lookup = {};
    for (oldItem of oldItems) {
        if (!oldItem.name) continue;
        delete oldItem.unavailable;
        lookup[oldItem.store + oldItem.id] = oldItem;
    }

    for (item of items) {
        let oldItem = lookup[item.store + item.id];
        delete lookup[item.store + item.id];
        let currPrice = item.priceHistory[0];
        if (oldItem) {
            if (oldItem.priceHistory[0].price == currPrice.price) {
                item.priceHistory = oldItem.priceHistory;
                continue;
            }

            for (oldPrice of oldItem.priceHistory) {
                item.priceHistory.push(oldPrice);
            }
        }
    }

    console.log(`${Object.keys(lookup).length} not in latest list.`);
    let removed = {};
    for (key of Object.keys(lookup)) {
        const item = lookup[key];
        if (model.stores[item.store]?.removeOld) {
            removed[item.store] = removed[item.store] ? removed[item.store] + 1 : 1;
        } else {
            item.unavailable = true;
            items.push(item);
        }
    }
    console.log("Removed items for discount-only stores");
    console.log(JSON.stringify(removed, null, 2));

    sortItems(items);
    console.log(`Items: ${items.length}`);

    return items;
}