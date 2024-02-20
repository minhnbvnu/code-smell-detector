function similaritySortItems(items, progress) {
    if (items.length == 0) return items;
    sortedItems = [items.shift()];
    let refItem = sortedItems[0];
    items.forEach((item) => (item.sorted = false));
    while (items.length != sortedItems.length) {
        const similarItem = findMostSimilarItem(refItem, items);
        sortedItems.push(similarItem.item);
        similarItem.item.sorted = true;
        refItem = similarItem.item;
        if (progress) progress(sortedItems, items);
    }
    items.forEach((item) => delete item.sorted);
    return sortedItems;
}