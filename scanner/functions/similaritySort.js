function similaritySort(items, filter, filterA, filterB) {
    const filteredItems = items.filter(filter);
    knn.vectorizeItems(filteredItems);
    const itemsA = filteredItems.filter(filterA);
    const itemsB = filteredItems.filter(filterB);
    const sortedItems = [];

    itemsB.forEach((item) => (item.sorted = false));
    const total = itemsA.length;
    while (itemsA.length > 0) {
        const refItem = itemsA.shift();
        const similar = knn.findMostSimilarItem(refItem, itemsB);
        if (similar.item != null) {
            sortedItems.push(refItem);
            sortedItems.push(similar.item);
        } else {
            console.log("No similar item found for " + refItem.name);
        }
        if (sortedItems.length % 100 == 0) console.log(sortedItems.length / 2 + "/" + total);
    }
    return sortedItems;
}