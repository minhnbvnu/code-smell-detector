function SyntheticNode(init) {
    this.children = [];
    for (var prop in init)
        this[prop] = init[prop];
    this.synthetic = true;
}