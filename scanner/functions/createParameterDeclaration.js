function createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer) {
                var _a2, _b;
                const node = createBaseDeclaration(166 /* Parameter */);
                node.modifiers = asNodeArray(modifiers);
                node.dotDotDotToken = dotDotDotToken;
                node.name = asName(name);
                node.questionToken = questionToken;
                node.type = type;
                node.initializer = asInitializer(initializer);
                if (isThisIdentifier(node.name)) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.dotDotDotToken) | propagateNameFlags(node.name) | propagateChildFlags(node.questionToken) | propagateChildFlags(node.initializer) | (((_a2 = node.questionToken) != null ? _a2 : node.type) ? 1 /* ContainsTypeScript */ : 0 /* None */) | (((_b = node.dotDotDotToken) != null ? _b : node.initializer) ? 1024 /* ContainsES2015 */ : 0 /* None */) | (modifiersToFlags(node.modifiers) & 16476 /* ParameterPropertyModifier */ ? 8192 /* ContainsTypeScriptClassSyntax */ : 0 /* None */);
                }
                node.jsDoc = void 0;
                return node;
            }