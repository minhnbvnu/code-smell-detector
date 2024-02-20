function walk_lambda(node, tw) {
    if (is_arrow(node) && node.value) {
        node.value.walk(tw);
    } else {
        walk_body(node, tw);
    }
}