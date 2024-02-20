function makeFunctionLongform(fixer, node) {
                const firstKeyToken = node.computed ? sourceCode.getTokens(node).find(token => token.value === "[") : sourceCode.getFirstToken(node.key);
                const lastKeyToken = node.computed ? sourceCode.getTokensBetween(node.key, node.value).find(token => token.value === "]") : sourceCode.getLastToken(node.key);
                const keyText = sourceCode.text.slice(firstKeyToken.range[0], lastKeyToken.range[1]);
                let functionHeader = "function";
                if (node.value.async) {
                    functionHeader = `async ${functionHeader}`;
                }
                if (node.value.generator) {
                    functionHeader = `${functionHeader}*`;
                }
                return fixer.replaceTextRange([node.range[0], lastKeyToken.range[1]], `${keyText}: ${functionHeader}`);
            }