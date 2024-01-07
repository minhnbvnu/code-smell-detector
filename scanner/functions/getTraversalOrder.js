function getTraversalOrder(items, orderBy, descending) {
        items.forEach(assignIndex);

        return items
            .slice()
            .sort(function (itemA, itemB) {
                return descending ? itemB[orderBy] - itemA[orderBy] : itemA[orderBy] - itemB[orderBy];
            })
            .map(getIndex);
    }