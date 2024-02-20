function* fixInsertTypeKeywordInNamedSpecifierList(fixer, typeSpecifiers) {
                for (const spec of typeSpecifiers) {
                    const insertText = sourceCode.text.slice(...spec.range);
                    yield fixer.replaceTextRange(spec.range, `type ${insertText}`);
                }
            }