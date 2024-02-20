function blockProp(prop) {
    return function(path) {
        makeBlock.call(this, path.get(prop));
    };
}