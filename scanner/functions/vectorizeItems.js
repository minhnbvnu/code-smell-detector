function vectorizeItems(items, useUnit = true) {
    items.forEach((item) => {
        if (!item.vector) vectorizeItem(item, useUnit);
    });
}