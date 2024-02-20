function createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                const node = createBaseDeclaration(259 /* FunctionDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.asteriskToken = asteriskToken;
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                if (!node.body || modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                    const isGenerator = !!node.asteriskToken;
                    const isAsyncGenerator = isAsync && isGenerator;
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.asteriskToken) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (isAsyncGenerator ? 128 /* ContainsES2018 */ : isAsync ? 256 /* ContainsES2017 */ : isGenerator ? 2048 /* ContainsGenerator */ : 0 /* None */) | (node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                }
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }