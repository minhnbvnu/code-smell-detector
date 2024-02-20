function findMostSimilarItems(refItem, items, k = 5, accept = (ref, item) => true) {
    let topSimilarItems = [];
    let topSimilarities = [];

    items.forEach((item, idx) => {
        if (!accept(refItem, item)) return;
        let similarity = dotProduct(refItem.vector, item.vector);

        if (topSimilarItems.length < k) {
            topSimilarItems.push(item);
            topSimilarities.push(similarity);
        } else {
            let minSimilarity = Math.min(...topSimilarities);
            let minIndex = topSimilarities.indexOf(minSimilarity);

            if (similarity > minSimilarity) {
                topSimilarItems[minIndex] = item;
                topSimilarities[minIndex] = similarity;
            }
        }
    });

    let similarItemsWithIndices = topSimilarItems.map((item, index) => {
        return {
            similarity: topSimilarities[index],
            item: item,
            index: items.indexOf(item),
        };
    });

    return similarItemsWithIndices;
}