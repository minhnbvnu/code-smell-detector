function fixInsertNamedSpecifiersInNamedSpecifierList(fixer, target, insertText) {
                const closingBraceToken = util.nullThrows(sourceCode.getFirstTokenBetween(sourceCode.getFirstToken(target), target.source, util.isClosingBraceToken), util.NullThrowsReasons.MissingToken('}', target.type));
                const before = sourceCode.getTokenBefore(closingBraceToken);
                if (!util.isCommaToken(before) && !util.isOpeningBraceToken(before)) {
                    insertText = `,${insertText}`;
                }
                return fixer.insertTextBefore(closingBraceToken, insertText);
            }