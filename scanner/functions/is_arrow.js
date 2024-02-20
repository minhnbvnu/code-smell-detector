function is_arrow(node) {
    return node instanceof AST_Arrow || node instanceof AST_AsyncArrow;
}