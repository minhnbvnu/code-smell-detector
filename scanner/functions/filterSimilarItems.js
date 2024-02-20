function filterSimilarItems(items) {
    const filteredItems = [];
    for (let i = 0; i < items.length; i += 2) {
        const a = items[i];
        const b = items[i + 1];
        if (b.priceHistory.some((price) => price.price == a.price) && a.quantity == b.quantity) {
            filteredItems.push(a);
            filteredItems.push(b);
        }
    }
    return filteredItems;
}