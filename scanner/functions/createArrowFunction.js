function createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body) {
                const node = createBaseDeclaration(216 /* ArrowFunction */);
                node.modifiers = asNodeArray(modifiers);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.equalsGreaterThanToken = equalsGreaterThanToken != null ? equalsGreaterThanToken : createToken(38 /* EqualsGreaterThanToken */);
                node.body = parenthesizerRules().parenthesizeConciseBodyOfArrowFunction(body);
                const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.equalsGreaterThanToken) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | (isAsync ? 256 /* ContainsES2017 */ | 16384 /* ContainsLexicalThis */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }