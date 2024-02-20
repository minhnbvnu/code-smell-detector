function getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken) {
                const text = sourceCode.text.slice(previousItemToken.range[1], commaToken.range[0]) +
                    sourceCode.text.slice(commaToken.range[1], currentItemToken.range[0]);
                const range = [previousItemToken.range[1], currentItemToken.range[0]];
                return function (fixer) {
                    return fixer.replaceTextRange(range, getReplacedText(styleType, text));
                };
            }