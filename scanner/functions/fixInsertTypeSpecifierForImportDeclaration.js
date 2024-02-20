function* fixInsertTypeSpecifierForImportDeclaration(fixer, node, isDefaultImport) {
                // import type Foo from 'foo'
                //       ^^^^^ insert
                const importToken = util.nullThrows(sourceCode.getFirstToken(node, util.isImportKeyword), util.NullThrowsReasons.MissingToken('import', node.type));
                yield fixer.insertTextAfter(importToken, ' type');
                if (isDefaultImport) {
                    // Has default import
                    const openingBraceToken = sourceCode.getFirstTokenBetween(importToken, node.source, util.isOpeningBraceToken);
                    if (openingBraceToken) {
                        // Only braces. e.g. import Foo, {} from 'foo'
                        const commaToken = util.nullThrows(sourceCode.getTokenBefore(openingBraceToken, util.isCommaToken), util.NullThrowsReasons.MissingToken(',', node.type));
                        const closingBraceToken = util.nullThrows(sourceCode.getFirstTokenBetween(openingBraceToken, node.source, util.isClosingBraceToken), util.NullThrowsReasons.MissingToken('}', node.type));
                        // import type Foo, {} from 'foo'
                        //                  ^^ remove
                        yield fixer.removeRange([
                            commaToken.range[0],
                            closingBraceToken.range[1],
                        ]);
                        const specifiersText = sourceCode.text.slice(commaToken.range[1], closingBraceToken.range[1]);
                        if (node.specifiers.length > 1) {
                            yield fixer.insertTextAfter(node, `\nimport type${specifiersText} from ${sourceCode.getText(node.source)};`);
                        }
                    }
                }
                // make sure we don't do anything like `import type {type T} from 'foo';`
                for (const specifier of node.specifiers) {
                    if (specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier &&
                        specifier.importKind === 'type') {
                        yield* fixRemoveTypeSpecifierFromImportSpecifier(fixer, specifier);
                    }
                }
            }