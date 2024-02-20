function isInsideTemplateLiteral(node, position, sourceFile) {
            return isTemplateLiteralKind(node.kind) && (node.getStart(sourceFile) < position && position < node.end) || !!node.isUnterminated && position === node.end;
        }