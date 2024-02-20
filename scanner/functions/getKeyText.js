function getKeyText(node) {
                if (node.type !== utils_1.AST_NODE_TYPES.TSIndexSignature) {
                    return sourceCode.getText(node.key);
                }
                const code = sourceCode.getText(node);
                return code.slice(0, sourceCode.getTokenAfter(at(node.parameters, -1), util.isClosingBracketToken).range[1] - node.range[0]);
            }