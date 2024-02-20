function containsExportStatement(block) {
        for (const statement of block.statements)
            if (statement.kind === ts.SyntaxKind.ExportDeclaration || statement.kind === ts.SyntaxKind.ExportAssignment)
                return true;
        return false;
    }