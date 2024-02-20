function findWidth(node, context, nodeExtractor, depthFor = nullDepthFor) {
    let last = 0;
    function compareWidth(node) {
        last = Math.max(
            last,
            TAB_SIZE * depthFor(node) + nodeExtractor(node).length
        );
    }
    const visitor = {
        onSummary: compareWidth,
        onDetail: compareWidth
    };
    node.visit(context.getVisitor(visitor));
    return last;
}