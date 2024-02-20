function insertItems(insertBefore, newItems) {
            Array.prototype.splice.apply(items, [insertBefore, 0].concat(newItems));
            updateIdxById(insertBefore);
            refresh();
        }