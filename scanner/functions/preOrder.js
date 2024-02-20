function preOrder(root, visitor) {
    visitor(root);
    for (const child of root.children) {
        preOrder(child, visitor);
    }
}