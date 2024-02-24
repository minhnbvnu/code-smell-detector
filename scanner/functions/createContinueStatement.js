function createContinueStatement(label) {
                const node = createBaseNode(248 /* ContinueStatement */);
                node.label = asName(label);
                node.transformFlags |= propagateChildFlags(node.label) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }