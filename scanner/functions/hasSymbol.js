function hasSymbol(node) {
        return Object.prototype.hasOwnProperty.call(node, 'symbol');
    }