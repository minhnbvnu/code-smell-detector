function createNamedTupleMember(dotDotDotToken, name, questionToken, type) {
                const node = createBaseDeclaration(199 /* NamedTupleMember */);
                node.dotDotDotToken = dotDotDotToken;
                node.name = name;
                node.questionToken = questionToken;
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }