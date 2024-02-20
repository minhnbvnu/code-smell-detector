function createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body) {
                const node = createBaseDeclaration(171 /* MethodDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.asteriskToken = asteriskToken;
                node.name = asName(name);
                node.questionToken = questionToken;
                node.exclamationToken = void 0;
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                if (!node.body) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                    const isGenerator = !!node.asteriskToken;
                    const isAsyncGenerator = isAsync && isGenerator;
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.asteriskToken) | propagateNameFlags(node.name) | propagateChildFlags(node.questionToken) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (isAsyncGenerator ? 128 /* ContainsES2018 */ : isAsync ? 256 /* ContainsES2017 */ : isGenerator ? 2048 /* ContainsGenerator */ : 0 /* None */) | (node.questionToken || node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                }
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }