function createSetAccessorDeclaration(modifiers, name, parameters, body) {
                const node = createBaseDeclaration(175 /* SetAccessor */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.parameters = createNodeArray(parameters);
                node.body = body;
                if (!node.body) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (node.type ? 1 /* ContainsTypeScript */ : 0 /* None */);
                }
                node.typeArguments = void 0;
                node.typeParameters = void 0;
                node.type = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }