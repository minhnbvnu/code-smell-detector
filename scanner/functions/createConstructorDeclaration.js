function createConstructorDeclaration(modifiers, parameters, body) {
                const node = createBaseDeclaration(173 /* Constructor */);
                node.modifiers = asNodeArray(modifiers);
                node.parameters = createNodeArray(parameters);
                node.body = body;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | 1024 /* ContainsES2015 */;
                node.typeParameters = void 0;
                node.type = void 0;
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }