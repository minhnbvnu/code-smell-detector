function isParseTreeNode(node) {
            return (node.flags & 8 /* Synthesized */) === 0;
        }