function isCaseOrDefaultClause(node) {
        return node.kind === ts.SyntaxKind.CaseClause ||
            node.kind === ts.SyntaxKind.DefaultClause;
    }