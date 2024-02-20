function addItem(item) {
            items.push(item);
            updateIdxById(items.length - 1);
            refresh();
        }