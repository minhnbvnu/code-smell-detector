function isStringTextContainingNode(node) {
            return node.kind === 10 /* StringLiteral */ || isTemplateLiteralKind(node.kind);
        }