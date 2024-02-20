function insertItem(insertBefore, item) {
            items.splice(insertBefore, 0, item);
            updateIdxById(insertBefore);
            refresh();
        }