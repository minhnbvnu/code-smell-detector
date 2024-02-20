function createBaseStringLiteral(text, isSingleQuote) {
                const node = createBaseDeclaration(10 /* StringLiteral */);
                node.text = text;
                node.singleQuote = isSingleQuote;
                return node;
            }