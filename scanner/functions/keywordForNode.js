function keywordForNode(node) {
            var _a2;
            return isIdentifier(node) ? (_a2 = identifierToKeywordKind(node)) != null ? _a2 : 0 /* Unknown */ : node.kind;
        }