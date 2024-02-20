function createRegularExpressionLiteral(text) {
                const node = createBaseToken(13 /* RegularExpressionLiteral */);
                node.text = text;
                return node;
            }