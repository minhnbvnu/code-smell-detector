function getNodeSpan(node) {
            return node.kind === 308 /* SourceFile */ ? createTextSpanFromRange(node) : createTextSpanFromNode(node, curSourceFile);
        }