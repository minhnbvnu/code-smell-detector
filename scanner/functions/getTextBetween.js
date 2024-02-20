function getTextBetween(node1, node2) {
                const allTokens = [node1].concat(sourceCode.getTokensBetween(node1, node2)).concat(node2);
                const sourceText = sourceCode.getText();
                return allTokens.slice(0, -1).reduce((accumulator, token, index) => accumulator + sourceText.slice(token.range[1], allTokens[index + 1].range[0]), "");
            }