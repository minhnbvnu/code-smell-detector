function* fixRemoveTypeSpecifierFromImportDeclaration(fixer, node) {
                var _a, _b;
                // import type Foo from 'foo'
                //        ^^^^ remove
                const importToken = util.nullThrows(sourceCode.getFirstToken(node, util.isImportKeyword), util.NullThrowsReasons.MissingToken('import', node.type));
                const typeToken = util.nullThrows(sourceCode.getFirstTokenBetween(importToken, (_b = (_a = node.specifiers[0]) === null || _a === void 0 ? void 0 : _a.local) !== null && _b !== void 0 ? _b : node.source, util.isTypeKeyword), util.NullThrowsReasons.MissingToken('type', node.type));
                const afterToken = util.nullThrows(sourceCode.getTokenAfter(typeToken, { includeComments: true }), util.NullThrowsReasons.MissingToken('any token', node.type));
                yield fixer.removeRange([typeToken.range[0], afterToken.range[0]]);
            }