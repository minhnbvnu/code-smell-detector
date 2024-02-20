function pathHead(path) {
    while (path.type === DOT)
        path = path.children[0];
    return path.value;
}