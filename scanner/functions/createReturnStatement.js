function createReturnStatement(expression) {
                const node = createBaseNode(250 /* ReturnStatement */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression) | 128 /* ContainsES2018 */ | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }