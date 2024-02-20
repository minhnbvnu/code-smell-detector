function* fixExportInsertType(fixer, sourceCode, node) {
        const exportToken = util.nullThrows(sourceCode.getFirstToken(node), util.NullThrowsReasons.MissingToken('export', node.type));
        yield fixer.insertTextAfter(exportToken, ' type');
        for (const specifier of node.specifiers) {
            if (specifier.exportKind === 'type') {
                const kindToken = util.nullThrows(sourceCode.getFirstToken(specifier), util.NullThrowsReasons.MissingToken('export', specifier.type));
                const firstTokenAfter = util.nullThrows(sourceCode.getTokenAfter(kindToken, {
                    includeComments: true,
                }), 'Missing token following the export kind.');
                yield fixer.removeRange([kindToken.range[0], firstTokenAfter.range[0]]);
            }
        }
    }