function implementationKindDisplayParts(node, checker) {
            const symbol = checker.getSymbolAtLocation(isDeclaration(node) && node.name ? node.name : node);
            if (symbol) {
                return getDefinitionKindAndDisplayParts(symbol, checker, node);
            }
            else if (node.kind === 207 /* ObjectLiteralExpression */) {
                return {
                    kind: "interface" /* interfaceElement */,
                    displayParts: [punctuationPart(20 /* OpenParenToken */), textPart("object literal"), punctuationPart(21 /* CloseParenToken */)]
                };
            }
            else if (node.kind === 228 /* ClassExpression */) {
                return {
                    kind: "local class" /* localClassElement */,
                    displayParts: [punctuationPart(20 /* OpenParenToken */), textPart("anonymous local class"), punctuationPart(21 /* CloseParenToken */)]
                };
            }
            else {
                return { kind: getNodeKind(node), displayParts: [] };
            }
        }