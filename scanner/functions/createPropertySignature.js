function createPropertySignature(modifiers, name, questionToken, type) {
                const node = createBaseDeclaration(168 /* PropertySignature */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.type = type;
                node.questionToken = questionToken;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.initializer = void 0;
                node.jsDoc = void 0;
                return node;
            }