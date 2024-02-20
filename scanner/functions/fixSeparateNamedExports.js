function* fixSeparateNamedExports(fixer, sourceCode, report) {
        const { node, typeBasedSpecifiers, inlineTypeSpecifiers, valueSpecifiers } = report;
        const typeSpecifiers = typeBasedSpecifiers.concat(inlineTypeSpecifiers);
        const source = getSourceFromExport(node);
        const specifierNames = typeSpecifiers.map(getSpecifierText).join(', ');
        const exportToken = util.nullThrows(sourceCode.getFirstToken(node), util.NullThrowsReasons.MissingToken('export', node.type));
        // Filter the bad exports from the current line.
        const filteredSpecifierNames = valueSpecifiers
            .map(getSpecifierText)
            .join(', ');
        const openToken = util.nullThrows(sourceCode.getFirstToken(node, util.isOpeningBraceToken), util.NullThrowsReasons.MissingToken('{', node.type));
        const closeToken = util.nullThrows(sourceCode.getLastToken(node, util.isClosingBraceToken), util.NullThrowsReasons.MissingToken('}', node.type));
        // Remove exports from the current line which we're going to re-insert.
        yield fixer.replaceTextRange([openToken.range[1], closeToken.range[0]], ` ${filteredSpecifierNames} `);
        // Insert the bad exports into a new export line above.
        yield fixer.insertTextBefore(exportToken, `export type { ${specifierNames} }${source ? ` from '${source}'` : ''};\n`);
    }