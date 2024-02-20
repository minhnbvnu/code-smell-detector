function prettyPrintItem(item) {
        return item.head + ' -> ' + item.body.join(' ') + ', ' + item.lookahead.join('/');
    }