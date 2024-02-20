function* fixRemoveTypeSpecifierFromImportSpecifier(fixer, node) {
                // import { type Foo } from 'foo'
                //          ^^^^ remove
                const typeToken = util.nullThrows(sourceCode.getFirstToken(node, util.isTypeKeyword), util.NullThrowsReasons.MissingToken('type', node.type));
                const afterToken = util.nullThrows(sourceCode.getTokenAfter(typeToken, { includeComments: true }), util.NullThrowsReasons.MissingToken('any token', node.type));
                yield fixer.removeRange([typeToken.range[0], afterToken.range[0]]);
            }