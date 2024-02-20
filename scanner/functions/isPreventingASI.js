function isPreventingASI(node, sourceCode) {
                const startToken = util.nullThrows(sourceCode.getFirstToken(node), util.NullThrowsReasons.MissingToken('first token', node.type));
                return ['(', '[', '`'].includes(startToken.value);
            }