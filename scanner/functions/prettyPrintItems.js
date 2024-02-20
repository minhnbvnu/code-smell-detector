function prettyPrintItems(items) {
        return items.map(prettyPrintItem, items).join('\n');
    }