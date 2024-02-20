function compareWidth(node) {
        last = Math.max(
            last,
            TAB_SIZE * depthFor(node) + nodeExtractor(node).length
        );
    }