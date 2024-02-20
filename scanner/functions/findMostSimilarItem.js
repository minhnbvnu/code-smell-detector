function findMostSimilarItem(refItem, items) {
    let maxSimilarity = -1;
    let similarItem = null;
    let similarItemIdx = -1;
    for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        if (item.sorted) continue;
        let similarity = dotProduct(refItem.vector, item.vector);
        if (similarity > maxSimilarity || similarity > 0.9999999) {
            maxSimilarity = similarity;
            similarItem = item;
            similarItemIdx = idx;
        }
        if (similarity > 0.9999999) {
            break;
        }
    }
    return {
        similarity: maxSimilarity,
        item: similarItem,
        index: similarItemIdx,
    };
}