function TreeWalker(callback) {
    this.callback = callback;
    this.directives = Object.create(null);
    this.stack = [];
}