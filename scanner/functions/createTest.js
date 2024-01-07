function createTest(attr, value) {
    if (attr instanceof Function) {
        return attr;
    }
    return (node) => {
        let x = node[attr];
        if (x instanceof Function) {
            x = x();
        }
        return x === value;
    };
}