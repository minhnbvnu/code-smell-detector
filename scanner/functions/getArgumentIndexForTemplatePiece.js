function getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile) {
            Debug.assert(position >= node.getStart(), "Assumed 'position' could not occur before node.");
            if (isTemplateLiteralToken(node)) {
                if (isInsideTemplateLiteral(node, position, sourceFile)) {
                    return 0;
                }
                return spanIndex + 2;
            }
            return spanIndex + 1;
        }