function createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer) {
                const node = createBaseDeclaration(169 /* PropertyDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.questionToken = questionOrExclamationToken && isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0;
                node.exclamationToken = questionOrExclamationToken && isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0;
                node.type = type;
                node.initializer = asInitializer(initializer);
                const isAmbient = node.flags & 16777216 /* Ambient */ || modifiersToFlags(node.modifiers) & 2 /* Ambient */;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (isAmbient || node.questionToken || node.exclamationToken || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | (isComputedPropertyName(node.name) || modifiersToFlags(node.modifiers) & 32 /* Static */ && node.initializer ? 8192 /* ContainsTypeScriptClassSyntax */ : 0 /* None */) | 16777216 /* ContainsClassFields */;
                node.jsDoc = void 0;
                return node;
            }