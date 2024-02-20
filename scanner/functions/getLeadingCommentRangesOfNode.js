function getLeadingCommentRangesOfNode(node, sourceFileOfNode) {
            return node.kind !== 11 /* JsxText */ ? getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : void 0;
        }